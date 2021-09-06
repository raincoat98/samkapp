import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { useTranslation } from "react-i18next";
import {
  schemaType,
  schemaToColums,
  getCollection,
  find,
  insert,
  update,
  deleteMany,
} from "utils/realmUtils";
import PageContainer from "components/base/PageContainer";
import FormModal from "components/base/FormModal";
import TableComponent from "components/base/TableComponent";
import { Row } from "react-table";
import { useDisclosure, Flex, Select } from "@chakra-ui/react";
import {
  BaseButtonGroups,
  DeleteButton,
  AddButton,
} from "components/base/Buttons";
import { ObjectId } from "bson";

export default function Management(props: {
  title: string;
  collectionName: string;
  schema: schemaType;
}) {
  const { title, collectionName, schema } = props;

  // 번역
  const { t: translate } = useTranslation();

  // 폼 모달 상태 관리
  const modalDisclosure = useDisclosure();
  const dispatch = useDispatch();
  const database = useSelector((state: RootState) => state.database);
  const realmApp = useSelector((state: RootState) => state.realm.app);
  const collection = getCollection({ app: realmApp, collectionName });

  // 체크한 테이블 열이 존재하는지 확인
  const [checkedRows, setCheckedRows] = React.useState<any[]>([]);
  const [isExistCheckedRow, setIsExistCheckedRow] = React.useState(false);
  // 현재 수정중인 데이터
  const [selected, setSelected] = React.useState<any>();
  // 폼모달 모드
  const [modalMode, setModalMode] = React.useState("");

  const onTableChange = React.useCallback(
    (props: { table: any; state: any; action: { type: string } }) => {
      const { table, state } = props;

      if (table) {
        const selectedRowIds = state.selectedRowIds;

        // 체크되어있는 열이 있는지 판단
        setIsExistCheckedRow(Object.keys(selectedRowIds).length !== 0);

        const selectedItemIdList: ObjectId[] = [];
        const rowsById = table.rowsById;

        for (const key in selectedRowIds) {
          const doc = rowsById[key].original as any;
          selectedItemIdList.push(doc._id);
        }

        setCheckedRows(selectedItemIdList);
      }
    },
    []
  );

  // 테이블 헤더에서 제외할 것들
  const disabledSchemaKeyList = useSelector(
    (state: RootState) => state.realm.disabledSchemaKeyList
  );
  const readonlySchemaKeyList = useSelector(
    (state: RootState) => state.realm.readonlySchemaKeyList
  );

  // 테이블 데이터
  const tableData: any[] = database[collectionName] ?? [];
  const columns = schemaToColums({
    schema,
    exclude: [...disabledSchemaKeyList, ...readonlySchemaKeyList],
  });
  Object.keys(columns).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(columns, key)) {
      let headerName = columns[Number(key)].Header;
      const header = translate(`table_field.${headerName as string}`);
      columns[Number(key)].Header = header;
    }
  });

  // 테이블 초기화
  let mainTable: any;
  mainTable = TableComponent({
    columns,
    data: tableData,
    onRowClick: onTableRowClick,
    stateReducer: React.useCallback(
      (newState: { selectedRowIds: Record<number, boolean> }, action: any) => {
        onTableChange({
          table: mainTable?.tableInstance,
          state: newState,
          action,
        });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    ),
  });

  React.useEffect(() => {
    init();

    async function init() {
      if (collection) {
        const result = await find({ collection });
        dispatch({
          type: "database/setData",
          payload: {
            key: collectionName,
            data: result,
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 데이터베이스에 데이터 insert 준비
  function prepareInsert() {
    setModalMode("insert");
    setSelected(undefined);
    modalDisclosure.onOpen();
  }

  // 데이터베이스에 데이터 update 준비
  function onTableRowClick(props: { event: any; row: Row<{}> }) {
    setModalMode("update");
    setSelected(props.row.original as any);
    modalDisclosure.onOpen();
  }

  async function onFormModalChange(props: {
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

  // 데이터베이스에 체크한 열 제거 요청
  async function deleteSelected() {
    if (realmApp?.currentUser) {
      const filter = {
        _id: { $in: checkedRows },
      };

      await deleteMany({
        useProgress: true,
        dispatch: dispatch,
        user: realmApp.currentUser,
        collectionName,
        filter,
      });
    }
  }

  return (
    <>
      <FormModal
        schmea={schema}
        mode={modalMode}
        initialValue={selected}
        isOpen={modalDisclosure.isOpen}
        onChange={onFormModalChange}
        onClose={modalDisclosure.onClose}
        children={null}
      />

      <PageContainer
        title={title}
        headerChildren={
          <BaseButtonGroups>
            <DeleteButton
              isDisabled={!isExistCheckedRow}
              onClick={deleteSelected}
              title="선택한 항목을 삭제합니다."
            />
            <AddButton onClick={prepareInsert} />
          </BaseButtonGroups>
        }
      >
        <Flex direction="column" width="100%" height="100%">
          {mainTable.component.box}
        </Flex>
      </PageContainer>
    </>
  );
}
