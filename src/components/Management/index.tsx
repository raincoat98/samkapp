import React from "react";
import { useDispatch } from "react-redux";
import {
  setCollectionData,
  insertData,
  updateData,
  deleteMany,
} from "store/realm";
import { useTranslation } from "react-i18next";
import {
  COLLECTION_NAME,
  COLLECTION_NAME_TYPE,
  schemaType,
  schemaToColums,
  readonlySchemaKeyList,
  disabledSchemaKeyList,
} from "utils/realmUtils";

// 테이블 관련 컴포넌트
import TableComponent, { TableComponentProps } from "components/TableComponent";
import { ReducerTableState, Row, TableInstance } from "react-table";

// chakra-ui
import {
  useDisclosure,
  useColorModeValue,
  Flex,
  Select,
  ButtonGroup,
  Button,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";

// 관련 컴포넌트
import PageContainer from "components/PageContainer";
import FormModal, {
  FormModalProps,
  formModalModeType,
} from "components/Management/FormModal";

// 관리 페이지
export default function Management(props: {
  title: string;
  collectionName: COLLECTION_NAME_TYPE;
  schema: schemaType;
  tabList?: string[];
  onTabChange?: (tabIndex: number) => void;
  filterList?: { schema: schemaType; data: any[] }[];
  formModalOptions?: FormModalProps["options"];
  tableProps: TableComponentProps;
}) {
  const {
    title,
    collectionName,
    schema,
    tabList,
    onTabChange,
    filterList,
    tableProps,
  } = props;

  // 번역
  const { t: translate } = useTranslation();

  // 폼 모달 상태 관리
  const modalDisclosure = useDisclosure();
  const dispatch = useDispatch();

  // 체크한 테이블 열이 존재하는지 확인
  const [checkedRows, setCheckedRows] = React.useState<any[]>([]);
  // 현재 수정중인 데이터
  const [selected, setSelected] = React.useState<any>();
  // 폼모달 모드
  const [modalMode, setModalMode] = React.useState<formModalModeType>("insert");

  const formModalProps: FormModalProps = {
    schema,
    mode: modalMode,
    initialValue: selected,
    isOpen: modalDisclosure.isOpen,
    onSave: onFormModalSave,
    onClose: modalDisclosure.onClose,
    options: props.formModalOptions,
  };

  const onTableChange = React.useCallback(
    (props: {
      table: TableInstance;
      state: ReducerTableState<any>;
      action: { type: string };
    }) => {
      const { table, state } = props;

      if (table && Object.entries(state.selectedRowIds).length !== 0) {
        const selectedRowIds = state.selectedRowIds;

        const selectedItemIdList: any[] = [];
        const rowsById = table.rowsById;

        for (const key in selectedRowIds) {
          if (rowsById[key]) {
            const origData = rowsById[key].original as Record<string, any>;
            selectedItemIdList.push(origData._id);
          }
        }

        setCheckedRows(selectedItemIdList);
      } else setCheckedRows([]);
    },
    []
  );

  // 테이블 데이터
  const columns = schemaToColums({
    schema,
    exclude: [...disabledSchemaKeyList, ...readonlySchemaKeyList],
  });

  // 테이블 헤더 및 값 번역
  Object.keys(columns).forEach((key) => {
    const column = columns[Number(key)];

    // 값 번역
    // 작업지시 우선순위
    if (column.Header === "priorities") {
      column.accessor = (originalRow: any, rowIndex: number) =>
        translate(originalRow["priorities"]);
    }
    // 작업지시 진행상황
    if (column.Header === "progress") {
      column.accessor = (originalRow: any, rowIndex: number) =>
        translate(originalRow["progress"]);
    }

    // 헤더 번역
    const header = translate(`${schema.name}.properties.${column.Header}`);
    column.Header = header;
  });

  // 테이블 초기화
  let mainTable: {
    tableInstance: TableInstance<object>;
    component: {
      box: JSX.Element;
      search: JSX.Element;
      pagination: JSX.Element;
      table: JSX.Element;
    };
  };
  mainTable = TableComponent({
    columns,
    data: tableProps.data,
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
    rowStyle: {
      color: {
        priorities: {
          emergency: useColorModeValue("white", "white"),
        },
      },
      bgColor: {
        priorities: {
          emergency: useColorModeValue("red.300", "red.800"),
        },
      },
      bgColorHover: {
        priorities: {
          emergency: useColorModeValue("red.400", "red.700"),
        },
      },
    },
  });

  const refreshData = React.useCallback(async () => {
    dispatch(setCollectionData(collectionName));

    if (filterList) {
      for (let index = 0; index < filterList.length; index++) {
        const name = filterList[index].schema.name as COLLECTION_NAME_TYPE;
        if (Object.values(COLLECTION_NAME).includes(name)) {
          dispatch(setCollectionData(name));
        }
      }
    }
  }, [collectionName, dispatch, filterList]);

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

  async function onFormModalSave(props: {
    type: string;
    document: Record<string, any>;
    initialValue: Record<string, any>;
  }) {
    const { type, document, initialValue } = props;

    switch (type) {
      case "insert": {
        dispatch(insertData({ collectionName, document }));
        break;
      }
      case "update": {
        dispatch(
          updateData({
            collectionName,
            filter: { _id: initialValue._id },
            update: { $set: document },
          })
        );
        break;
      }
    }

    modalDisclosure.onClose();
  }

  // 데이터베이스에 체크한 열 제거 요청
  async function deleteSelected() {
    dispatch(
      deleteMany({
        collectionName,
        ids: checkedRows,
      })
    );
  }

  return (
    <>
      {/* 입력 다이얼로그 */}
      <FormModal {...formModalProps} />

      <PageContainer
        title={title}
        headerChildren={
          <ButtonGroup>
            <Button
              onClick={() => deleteSelected()}
              isDisabled={Object.keys(checkedRows).length === 0}
              colorScheme="red"
            >
              삭제
            </Button>
            <Button onClick={() => prepareInsert()} colorScheme="blue">
              추가
            </Button>
            <Button onClick={() => refreshData()}>새로고침</Button>
          </ButtonGroup>
        }
      >
        <Flex direction="column" width="100%" height="100%">
          {/* 탭 추가 */}
          {Array.isArray(tabList) ? (
            <Tabs
              onChange={(tabIndex) => {
                if (onTabChange) onTabChange(tabIndex);
              }}
            >
              <TabList>
                {tabList?.map((tab, index) => (
                  <Tab key={index}>{tab}</Tab>
                ))}
              </TabList>
            </Tabs>
          ) : (
            ""
          )}
          {/* 필터 추가 */}
          {Array.isArray(filterList) ? (
            <Flex>
              {filterList?.map((filter, index) => (
                <Select
                  placeholder={translate(`${filter.schema.name}.name`)}
                  key={index}
                  size="sm"
                >
                  {filter.data.map((filterItem, index) => (
                    <option
                      value={filterItem[filter.schema.primaryKey].toString()}
                      key={index}
                    >
                      {filterItem[`${filter.schema.name}_name`]}
                    </option>
                  ))}
                </Select>
              ))}
            </Flex>
          ) : (
            ""
          )}
          {mainTable.component.box}
        </Flex>
      </PageContainer>
    </>
  );
}
