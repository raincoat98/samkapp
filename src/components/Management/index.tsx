import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getData,
  insertData,
  updateData,
  deleteData,
  dataType,
} from "store/realm";
import { Column, Accessor } from "react-table";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { schemaType } from "schema";

// 테이블 관련 컴포넌트
import TableComponent, { TableComponentProps } from "components/TableComponent";
import { ReducerTableState, TableInstance } from "react-table";

// chakra-ui
import {
  useDisclosure,
  Flex,
  Box,
  HStack,
  VStack,
  Badge,
} from "@chakra-ui/react";

// 관련 컴포넌트
import PageContainer from "components/PageContainer";
import FormModal, { formModalModeType } from "components/FormModal";
import ManagementHeaderButtonGroup from "./HeaderButtonGroup";
import Dialog from "components/Dialog";

import TableTabs, { ManagementTableTabsProps } from "./TableTabs";
import TableFilter, { ManagementTableFilterProps } from "./TableFilter";

import { createExcelFile, downloadExcelFile } from "utils/excel";

// 관리 페이지
export default function Management(props: {
  title: string; // 브라우저 페이지 이름
  schema: schemaType; // 테이블 스키마
  tableProps: TableComponentProps;
  tabProps?: ManagementTableTabsProps;
  filtersProps?: ManagementTableFilterProps[];
}) {
  const { title, schema, tableProps, tabProps, filtersProps } = props;

  // 번역
  const { t: translate } = useTranslation();

  // 데이터베이스
  const database = useSelector((state: RootState) => state.realm.database);

  // 폼 모달 상태 관리
  const modalDisclosure = useDisclosure();
  const dispatch = useDispatch();

  // 삭제 다이얼로그 상태 관리
  const dialogDisclosure = useDisclosure();

  // 체크한 테이블 열이 존재하는지 확인
  const [checkedRows, setCheckedRows] = React.useState<any[]>([]);
  // 현재 수정중인 데이터
  const [selected, setSelected] = React.useState<any>();
  const [selectedRowIndex, setSelectedRowIndex] = React.useState<number>(0);
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

        const selectedItemList: any[] = [];
        const rowsById = table.rowsById;

        for (const key in selectedRowIds) {
          if (rowsById[key]) selectedItemList.push(rowsById[key].original);
        }

        setCheckedRows(selectedItemList);
      } else setCheckedRows([]);
    },
    []
  );

  // 테이블 데이터
  const columns: Column[] = [];
  for (const key in schema.properties) {
    const property = schema.properties[key];
    const type = property.as ?? property.type;

    if (property.isDisalbePreview || property.isNotVisible) continue;

    let accessor: string | Accessor<{}> | undefined;

    // 선택 input일 경우 (예: 우선순위)
    if (property.select) {
      const select = property.select;
      accessor = (originalRow) => {
        try {
          const origRow = originalRow as Record<string, any>;
          const selectedData = origRow[key];
          const selected = select.filter((data) => {
            return data.value === selectedData;
          })[0];
          if (selected) return selected.name;
          else return selectedData;
        } catch (error) {
          console.error(error);
          return "잘못된 값";
        }
      };
    } else {
      switch (type) {
        case "string":
        case "number": {
          // 테이블 뷰에서 외부 데이터베이스 테이블 값 가져오기
          if (property.foreign) {
            const foreign = property.foreign;
            const dataList = [...database[foreign.table]];

            // 품목
            if (
              property.foreign.table === "part" &&
              property.foreign.key === "part_id"
            ) {
              accessor = (originalRow: Record<string, any>) => {
                try {
                  const item: any = dataList.find((data: any) => {
                    return data[foreign.key] === originalRow[key];
                  });

                  return (
                    <VStack>
                      <Box>{item.part_name}</Box>
                      <HStack spacing={1}>
                        {item.spec1 && <Badge>{item.spec1}</Badge>}
                        {item.spec2 && <Badge>{item.spec2}</Badge>}
                        {item.spec3 && <Badge>{item.spec3}</Badge>}
                        {item.spec4 && <Badge>{item.spec4}</Badge>}
                        {item.spec5 && <Badge>{item.spec5}</Badge>}
                      </HStack>
                    </VStack>
                  );
                } catch (error) {
                  console.error(error);
                  return "잘못된 값";
                }
              };
              // 그외
            } else {
              accessor = (originalRow: Record<string, any>) => {
                try {
                  if (foreign?.table) {
                    const item: any = dataList.find((data: any) => {
                      return data[foreign.key] === originalRow[key];
                    });

                    if (item) {
                      return foreign.display
                        ? item[foreign.display]
                        : item[foreign.key];
                    }
                  }
                } catch (error) {
                  console.error(error);
                  return "잘못된 값";
                }
              };
            }
          } else accessor = key;
          break;
        }
        case "date":
        case "month": {
          accessor = (originalRow) => {
            try {
              const origRow = originalRow as Record<string, any>;
              const isMonth =
                property.type === "month" || property.as === "month";
              return origRow[key]
                ? isMonth
                  ? moment(origRow[key]).format("YYYY-MM") // 년월
                  : moment(origRow[key]).format("YYYY-MM-DD") // 년월일
                : "";
            } catch (error) {
              console.error(error);
              return "잘못된 값";
            }
          };
          break;
        }
        case "boolean": {
          accessor = (originalRow) => {
            const origRow = originalRow as Record<string, any>;
            const boolData = origRow[key] as boolean;
            if (boolData) return "예";
            else return "아니오";
          };
          break;
        }
      }
    }

    // 헤더 번역
    const header = translate(`${schema.name}.properties.${key}`);

    columns.push({
      Header: header,
      accessor,
      width: 130,
    });
  }

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
    // 열 클릭 이벤트
    onRowClick: (row) => {
      setModalMode("update");
      setSelected(row.original as any);
      console.log(row.original);

      modalDisclosure.onOpen();
      setSelectedRowIndex(row.index);
    },
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
    dispatch(getData({ collectionName: schema.name }));
  }

  // 데이터베이스에 데이터 insert 준비
  function prepareInsert() {
    setModalMode("insert");
    setSelected(undefined);
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
        dispatch(
          insertData({
            collectionName: schema.name,
            document: document as dataType,
          })
        );
        break;
      }
      case "update": {
        dispatch(
          updateData({
            collectionName: schema.name,
            update: { ...initialValue, ...document } as dataType,
          })
        );
        break;
      }
    }

    modalDisclosure.onClose();
  }

  // 데이터베이스에 체크한 열 제거 요청
  async function deleteSelected() {
    for (let index = 0; index < checkedRows.length; index++) {
      const row = checkedRows[index];
      await dispatch(
        deleteData({
          collectionName: schema.name,
          item: row,
        })
      );
    }
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
        onOpen={modalDisclosure.onOpen}
        onClose={modalDisclosure.onClose}
        leftButton={
          modalMode === "update"
            ? {
                isDisabled: selectedRowIndex < 1,
                onClick: () => {
                  const index = selectedRowIndex - 1;
                  if (selectedRowIndex !== undefined) {
                    setSelectedRowIndex(index);
                    setSelected(tableProps.data[index]);
                  }
                },
              }
            : undefined
        }
        rightButton={
          modalMode === "update"
            ? {
                isDisabled: selectedRowIndex >= tableProps.data.length - 1,
                onClick: () => {
                  const index = selectedRowIndex + 1;
                  if (selectedRowIndex !== undefined) {
                    setSelectedRowIndex(index);
                    setSelected(tableProps.data[index]);
                  }
                },
              }
            : undefined
        }
      />

      <Dialog
        isOpen={dialogDisclosure.isOpen}
        onClose={dialogDisclosure.onClose}
        onConfirm={() => {
          deleteSelected();
          dialogDisclosure.onClose();
        }}
        headerChildren="삭제 확인"
      >
        선택한 {checkedRows.length}개의 항목을 삭제하시겠습니까?
      </Dialog>

      <PageContainer
        title={title}
        headerChildren={
          <ManagementHeaderButtonGroup
            isDeleteDisabled={Object.keys(checkedRows).length === 0}
            onDeleteClick={dialogDisclosure.onOpen}
            isAddDisabled={false}
            onAddClick={prepareInsert}
            isRefreshDisabled={false}
            onRefreshClick={refreshData}
            isSaveAsExcelDisabled={false}
            onSaveAsExcelClick={() => {
              const excel = createExcelFile(schema, tableProps.data);
              downloadExcelFile(excel);
            }}
          />
        }
      >
        <Flex flexDir="column" width="100%" height="100%">
          {/* 탭 추가 */}
          {tabProps && <TableTabs {...tabProps} />}

          {filtersProps && (
            <HStack paddingX={2} paddingTop={2} spacing={2}>
              {filtersProps.map((filter, index) => (
                <TableFilter {...filter} key={index} />
              ))}
            </HStack>
          )}

          {mainTable.component.box}
        </Flex>
      </PageContainer>
    </>
  );
}
