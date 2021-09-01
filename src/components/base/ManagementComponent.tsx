import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { Row } from "react-table";
import { useTranslation } from "react-i18next";
import { ObjectId } from "bson";
import {
  useDisclosure,
  Flex,
  Tab,
  TabList,
  Tabs,
  Wrap,
} from "@chakra-ui/react";
import {
  schemaType,
  schemaToColums,
  distinct,
  insert,
  update,
  deleteMany,
} from "utils/realmUtils";
import PageContainer from "components/base/PageContainer";
import TableComponent from "components/base/TableComponent";
import FormModal from "components/base/FormModal";
import {
  BaseButtonGroups,
  AddButton,
  DeleteButton,
} from "components/base/Buttons";

export default function ManagementComponent(props: {
  title: string;
  collectionName: string;
  schema: schemaType;
  useTabs?: {
    distinctField: string;
    basicFilterList?: {
      name: string;
      filter?: {
        id: string;
        value: string | number;
      };
    }[];
  };
}) {
  const { title, collectionName, schema, useTabs } = props;

  const dispatch = useDispatch();

  // 진행 표시줄 화면 관리
  const modalDisclosure = useDisclosure();

  // 번역
  const { t: translate } = useTranslation();

  // 데이터 베이스 설정
  const realmApp = useSelector((state: RootState) => state.realm.app);
  const mongodb = realmApp?.currentUser?.mongoClient("mongodb-atlas");
  const collection = mongodb?.db("database")?.collection<any>(collectionName);
  const [changeStream, setChangeStream] = React.useState<AsyncGenerator<any>>();
  // 행
  const columns = schemaToColums(schema);
  Object.keys(columns).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(columns, key)) {
      let headerName = columns[Number(key)].Header;
      const header = translate(`table_field.${headerName as string}`);
      columns[Number(key)].Header = header;
    }
  });
  // 열
  const [data, setData] = React.useState<any[]>([]);
  // 선택한 열이 존재하는지 확인
  const [isExistSelectedRow, setIsExistSelectedRow] = React.useState(false);

  // 선택한 항목
  const [selected, setSelected] = React.useState<any>();
  const [modalMode, setModalMode] = React.useState("");

  // 테이블 필터
  const [distinctFieldList, setDistinctFieldList] = React.useState<string[]>(
    []
  );

  // 재고없음 필터에서 재고가 정확히 0일 때만 표시되도록
  for (let index = 0; index < columns.length; index++) {
    if (columns[index].accessor === "stock") {
      // @ts-ignore
      columns[index].filter = "equals";
    }
  }

  // 테이블 초기화
  const mainTable = TableComponent({
    columns,
    data,
    onRowClick: prepareUpdate,
    stateReducer: React.useCallback(
      (newState: { selectedRowIds: Record<number, boolean> }) => {
        setIsExistSelectedRow(
          Object.keys(newState.selectedRowIds).length !== 0
        );
      },
      []
    ),
  });

  // 초기화
  React.useEffect(() => {
    init();

    async function init() {
      // 진행 표시줄 ON
      dispatch({
        type: "system/openProgress",
      });

      // 탭 생성
      if (useTabs && realmApp?.currentUser) {
        const value = await distinct({
          user: realmApp.currentUser,
          collectionName,
          field: useTabs.distinctField,
        });
        setDistinctFieldList(value.result);
      }

      if (collection) {
        await collection
          .find()
          .then((value) => {
            if (!data.length) {
              setData(value);
            }
          })
          // 실패해도 반드시 실행
          .finally(async () => {
            if (!changeStream) await setChangeStream(await collection.watch());
            // 진행 표시줄 OFF
            dispatch({
              type: "system/closeProgress",
            });
          });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 테이블 데이터 세팅
  React.useCallback((listValue: any[]) => {
    setData(listValue);
  }, []);

  // 스트리밍
  React.useEffect(() => {
    streamStart();

    async function streamStart() {
      if (!changeStream) return;

      for await (const change of changeStream) {
        switch (change.operationType) {
          case "insert": {
            // 삽입 작업 일 때
            const { documentKey, fullDocument } = change;
            console.log(`new document with _id`, documentKey, fullDocument);
            setData([...data, fullDocument]);
            break;
          }
          case "update": {
            // 수정 작업 일 때
            const { documentKey, fullDocument } = change;
            for (let index = 0; index < data.length; index++) {
              if (
                data[index][schema.primaryKey].equals(
                  documentKey[schema.primaryKey]
                )
              ) {
                data[index] = fullDocument;
              }
            }
            console.log(`updated document`, documentKey, fullDocument);
            break;
          }
          // case "replace": {
          //   const { documentKey, fullDocument } = change;
          //   console.log(`replaced document`, documentKey, fullDocument);
          //   break;
          // }
          case "delete": {
            // 삭제 작업 일 때
            const { documentKey } = change;
            for (let index = 0; index < data.length; index++) {
              setData(
                data.filter(
                  (document) =>
                    !document[schema.primaryKey].equals(
                      documentKey[schema.primaryKey]
                    )
                )
              );
            }
            console.log(`deleted document`, documentKey);
            break;
          }
          default: {
            console.log(change);
          }
        }
      }
    }
  }, [changeStream, collectionName, data, schema.primaryKey]);

  // 데이터베이스에 데이터 insert 준비
  function prepareInsert() {
    setModalMode("insert");
    setSelected(undefined);
    modalDisclosure.onOpen();
  }

  // 데이터베이스에 데이터 update 준비
  function prepareUpdate(props: { event: any; row: Row<{}> }) {
    setModalMode("update");
    setSelected(props.row.original as any);
    modalDisclosure.onOpen();
  }

  async function onChange(props: {
    type: string;
    document: Record<string, any>;
    initialValue: Record<string, any>;
  }) {
    if (realmApp?.currentUser) {
      const { type, document, initialValue } = props;

      switch (type) {
        case "insert": {
          await insert({
            useProgress: true,
            dispatch: dispatch,
            user: realmApp.currentUser,
            collectionName,
            document,
          });
          break;
        }
        case "update": {
          await update({
            useProgress: true,
            dispatch: dispatch,
            user: realmApp.currentUser,
            collectionName,
            filter: { _id: initialValue._id },
            update: { $set: document },
          });
          break;
        }
      }

      modalDisclosure.onClose();
    }
  }

  // 탭이 바뀌었을 때
  async function onTabChange(tab: number) {
    if (!useTabs) return;

    // 기본 필터 길이 (없으면 0)
    const basicFilterListLength = useTabs.basicFilterList
      ? useTabs.basicFilterList.length
      : 0;
    const name = distinctFieldList[tab - basicFilterListLength];
    if (name) {
      // @ts-ignore
      mainTable.tableInstance.setAllFilters([
        { id: useTabs.distinctField, value: name },
      ]);
    } else {
      if (useTabs.basicFilterList) {
        const filter = useTabs.basicFilterList[tab].filter;
        if (filter) {
          // @ts-ignore
          mainTable.tableInstance.setAllFilters([
            useTabs.basicFilterList[tab].filter,
          ]);
        } else {
          // @ts-ignore
          mainTable.tableInstance.setAllFilters([]);
        }
      }
    }
  }

  // 데이터베이스에 선택한 항목 제거 요청
  async function deleteSelected() {
    if (realmApp?.currentUser) {
      const selectedItemIdList: ObjectId[] = [];
      const rowsById = mainTable.tableInstance.rowsById;
      // @ts-ignore
      const selectedRowIds = mainTable.tableInstance.state.selectedRowIds;

      for (const key in selectedRowIds) {
        const doc = rowsById[key].original as any;
        selectedItemIdList.push(doc._id);
      }

      const filter = {
        _id: { $in: selectedItemIdList },
      };

      await deleteMany({
        useProgress: true,
        dispatch: dispatch,
        user: realmApp.currentUser,
        collectionName,
        filter,
      });

      modalDisclosure.onClose();
    }
  }

  return (
    <PageContainer
      title={title}
      headerChildren={
        <BaseButtonGroups>
          <DeleteButton
            isDisabled={!isExistSelectedRow}
            onClick={deleteSelected}
            title="선택한 항목을 삭제합니다."
          />
          <AddButton onClick={prepareInsert} />
        </BaseButtonGroups>
      }
    >
      <FormModal
        schmea={schema}
        mode={modalMode}
        initialValue={selected}
        isOpen={modalDisclosure.isOpen}
        onChange={onChange}
        onClose={modalDisclosure.onClose}
        children={null}
      />

      <Flex direction="column" width="100%" height="100%">
        {useTabs && useTabs.basicFilterList ? (
          <Tabs onChange={onTabChange} isFitted size="sm">
            <TabList whiteSpace="nowrap">
              <Wrap spacing={0}>
                {useTabs.basicFilterList.map((filter, index) => (
                  <Tab key={index}>{filter.name}</Tab>
                ))}
                {distinctFieldList.map((name, index) => (
                  <Tab key={index}>{name}</Tab>
                ))}
              </Wrap>
            </TabList>
          </Tabs>
        ) : (
          ""
        )}

        {mainTable.component.box}
      </Flex>
    </PageContainer>
  );
}
