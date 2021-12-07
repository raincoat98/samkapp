import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getData, insertData, updateData, deleteData } from "store/realm";
import { Column, Accessor } from "react-table";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { schemaType } from "schema";

// 테이블 관련 컴포넌트
import TableComponent, { TableComponentProps } from "components/TableComponent";
import { ReducerTableState, Row, TableInstance } from "react-table";

// chakra-ui
import {
  useDisclosure,
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
import FormModal, { formModalModeType } from "components/FormModal";

// 관리 페이지
export default function Management(props: {
  title: string; // 브라우저 페이지 이름
  schema: schemaType; // 테이블 스키마
  tabList?: string[];
  filterList?: { schema: schemaType; key: string; display: string }[];
  onTabChange?: (tabIndex: number) => void;
  tableProps: TableComponentProps;
}) {
  const { title, schema, tabList, onTabChange, filterList, tableProps } = props;

  // 번역
  const { t: translate } = useTranslation();

  // 데이터베이스
  const database = useSelector((state: RootState) => state.realm.database);
  const tableDataList = tableProps.data;
  const [filteredDataList, setFilteredDataList] = React.useState<any[]>([
    ...tableDataList,
  ]);

  // 폼 모달 상태 관리
  const modalDisclosure = useDisclosure();
  const dispatch = useDispatch();

  // 체크한 테이블 열이 존재하는지 확인
  const [checkedRows, setCheckedRows] = React.useState<any[]>([]);
  // 현재 수정중인 데이터
  const [selected, setSelected] = React.useState<any>();
  // 폼모달 모드
  const [modalMode, setModalMode] = React.useState<formModalModeType>("insert");

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
      const property = schema.properties[key];
      const type = property.type;

      let accessor: string | Accessor<{}> | undefined;

      switch (type) {
        case "string":
        case "number": {
          // 테이블 뷰에서 외부 데이터베이스 테이블 값 가져오기
          if (property.foreign) {
            accessor = (originalRow: Record<string, any>) => {
              const foreign = property.foreign;
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
            const isMonth =
              property.type === "month" || property.as === "month";
            return origRow[key]
              ? isMonth
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
        width: 130,
      });
    }

    return columns;
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
    data: filteredDataList,
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

  function refreshData() {
    // 현재 테이블 데이터 새로고침
    dispatch(getData(schema.name));

    // 필터 데이터 새로고침
    if (filterList) {
      for (let index = 0; index < filterList.length; index++) {
        dispatch(getData(filterList[index].schema.name));
      }
    }
  }

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
        dispatch(insertData({ collectionName: schema.name, document }));
        break;
      }
      case "update": {
        dispatch(
          updateData({
            collectionName: schema.name,
            filter: initialValue,
            update: { ...initialValue, ...document },
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
      <FormModal
        schema={schema}
        mode={modalMode}
        initialValue={selected}
        isOpen={modalDisclosure.isOpen}
        onSave={onFormModalSave}
        onClose={modalDisclosure.onClose}
      />

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
              {filterList?.map((filterItem, index) => {
                const filterDataList: any[] = [
                  ...database[filterItem.schema.name],
                ];

                return (
                  <Select
                    onChange={(event) => {
                      const dataList = [...tableDataList];
                      // 선택 해제시
                      if (!event.target.value) {
                        setFilteredDataList(dataList);
                      } else {
                        setFilteredDataList(
                          dataList.filter(
                            (item: any) =>
                              item[filterItem.key] ===
                              filterDataList[Number(event.target.value)][
                                filterItem.key
                              ]
                          )
                        );
                      }
                    }}
                    placeholder={translate(`${filterItem.schema.name}.name`)}
                    size="sm"
                    key={index}
                  >
                    {filterDataList.map((item: any, index) => {
                      return (
                        <option value={index} key={index}>
                          {item[filterItem.display]}
                        </option>
                      );
                    })}
                  </Select>
                );
              })}
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
