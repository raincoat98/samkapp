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
import { ReducerTableState, TableInstance } from "react-table";

// chakra-ui
import {
  useDisclosure,
  Flex,
  ButtonGroup,
  Icon,
  IconButton,
} from "@chakra-ui/react";

// 관련 컴포넌트
import PageContainer from "components/PageContainer";
import FormModal, { formModalModeType } from "components/FormModal";
import { refresh, add, trash } from "utils/icons";

import TableTabs, { ManagementTableTabsProps } from "./TableTabs";

// 관리 페이지
export default function Management(props: {
  title: string; // 브라우저 페이지 이름
  schema: schemaType; // 테이블 스키마
  tableProps: TableComponentProps;
  tabProps?: ManagementTableTabsProps;
}) {
  const { title, schema, tableProps, tabProps } = props;

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
            accessor = (originalRow: Record<string, any>) => {
              try {
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
              } catch (error) {
                console.error(error);
                return "잘못된 값";
              }
            };
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
      modalDisclosure.onOpen();
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
      />

      <PageContainer
        title={title}
        headerChildren={
          <ButtonGroup>
            <IconButton
              onClick={() => deleteSelected()}
              icon={<Icon as={trash} />}
              isDisabled={Object.keys(checkedRows).length === 0}
              colorScheme="red"
              aria-label="삭제"
              title="삭제"
              borderWidth={1}
            />
            <IconButton
              onClick={() => prepareInsert()}
              icon={<Icon as={add} />}
              colorScheme="blue"
              aria-label="신규"
              title="신규"
              borderWidth={1}
            />
            <IconButton
              icon={<Icon as={refresh} />}
              onClick={() => refreshData()}
              aria-label="새로고침"
              title="새로고침"
              borderWidth={1}
            />
          </ButtonGroup>
        }
      >
        <Flex direction="column" width="100%" height="100%">
          {/* 탭 추가 */}
          {tabProps && <TableTabs {...tabProps} />}

          {mainTable.component.box}
        </Flex>
      </PageContainer>
    </>
  );
}
