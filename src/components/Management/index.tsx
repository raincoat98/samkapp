import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getData, insertData, updateData, deleteData } from "store/realm";
import { Column, Accessor } from "react-table";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { COLLECTION_NAME, COLLECTION_NAME_TYPE, schemaType } from "schema";

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

  // 데이터베이스
  const database = useSelector((state: RootState) => state.realm.database);

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
  });

  // 스키마에서 react-table 헤더로 변환
  function schemaToColums(props: { schema: schemaType; exclude?: string[] }) {
    const { schema, exclude } = props;

    const columns: Column[] = [];

    const properties: string[] = [];
    for (const key in schema.properties) {
      // 제외해야 할 키일 때 다음 항목으로
      if (exclude?.includes(key)) continue;
      properties.push(key);
    }

    for (let index = 0; index < properties.length; index++) {
      const key = properties[index];
      const type = schema.properties[key].type;
      let accessor: string | Accessor<{}> | undefined;

      switch (type) {
        case "string":
        case "number": {
          // 테이블 뷰에서 외부 데이터베이스 테이블 값 가져오기
          if (schema.properties[key].foreign) {
            accessor = (originalRow: Record<string, any>) => {
              const foreign = schema.properties[key].foreign;
              if (foreign?.table) {
                const dataList = [...database[foreign.table]];
                const item: any = dataList.filter((data: any) => {
                  return data[foreign.key] === originalRow[foreign.key];
                })[0];
                if (item) {
                  return foreign.display
                    ? item[foreign.display]
                    : item[foreign.key];
                }
              }
            };
          } else accessor = key;
          break;
        }
        case "date": {
          accessor = (originalRow) => {
            const origRow = originalRow as Record<string, any>;
            return origRow[key]
              ? isMonth(key)
                ? moment(origRow[key]).format("YYYY-MM") // 년월
                : moment(origRow[key]).format("YYYY-MM-DD") // 년월일
              : "";
          };
          break;
        }
        case "boolean": {
          accessor = (originalRow) => {
            const origRow = originalRow as Record<string, any>;
            const boolData = origRow[key] as boolean;
            switch (boolData) {
              case true:
                return "예";
              default:
                return "아니오";
            }
          };
          break;
        }
      }

      columns.push({
        Header: key,
        accessor,
      });
    }

    return columns;

    function isMonth(key: string) {
      return key.endsWith("month");
    }
  }

  // 테이블 헤더 및 값 번역
  Object.keys(columns).forEach((key) => {
    const column = columns[Number(key)];

    // 헤더 번역
    column.Header = translate(
      `${schema.name}.properties.${column.Header}`
    ) as string;
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
    dispatch(getData(collectionName));

    if (filterList) {
      for (let index = 0; index < filterList.length; index++) {
        const name = filterList[index].schema.name as COLLECTION_NAME_TYPE;
        if (Object.values(COLLECTION_NAME).includes(name)) {
          dispatch(getData(name));
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
            filter: { _id: initialValue._id() },
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
    // dispatch(
    //   deleteData({
    //     collectionName,
    //     ids: checkedRows,
    //   })
    // );
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
                  {filter.data.map((filterItem, index) => {
                    let primaryKey = "";
                    for (const key in filter.schema.properties) {
                      const property = filter.schema.properties[key];
                      if (property.isPrimary) primaryKey = key;
                    }

                    if (primaryKey === "")
                      console.error("기본키를 찾을 수 없음");

                    return (
                      <option value={filterItem[primaryKey]} key={index}>
                        {filterItem["name"]}
                      </option>
                    );
                  })}
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
