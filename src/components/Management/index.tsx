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
  schemaType,
  schemaToColums,
  readonlySchemaKeyList,
  disabledSchemaKeyList,
} from "utils/realmUtils";
import PageContainer from "components/PageContainer";
import FormModal from "components/Management/FormModal";
import TableComponent, { TableComponentProps } from "components/TableComponent";
import { Row } from "react-table";
import { useDisclosure, Flex, Select, Button } from "@chakra-ui/react";
import { BaseButtonGroups, DeleteButton, AddButton } from "components/Buttons";

export default function Management(props: {
  title: string;
  collectionName: string;
  schema: schemaType;
  filterList?: { schema: schemaType; data: any[] }[];
  tableProps: TableComponentProps;
}) {
  const { title, collectionName, schema, filterList, tableProps } = props;

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
  const [modalMode, setModalMode] = React.useState("");

  const onTableChange = React.useCallback(
    (props: { table: any; state: any; action: { type: string } }) => {
      const { table, state } = props;

      if (table && Object.entries(state.selectedRowIds).length !== 0) {
        const selectedRowIds = state.selectedRowIds;

        const selectedItemIdList: any[] = [];
        const rowsById = table.rowsById;

        for (const key in selectedRowIds) {
          selectedItemIdList.push(rowsById[key]?.original._id);
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
  Object.keys(columns).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(columns, key)) {
      const header = translate(
        `${schema.name}.properties.${columns[Number(key)].accessor}`
      );
      columns[Number(key)].Header = header;
    }
  });

  // 테이블 초기화
  let mainTable: any;
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
  });

  const refreshData = React.useCallback(async () => {
    dispatch(setCollectionData(collectionName));

    if (filterList) {
      for (let index = 0; index < filterList.length; index++) {
        console.log(filterList[index].schema.name);

        dispatch(setCollectionData(filterList[index].schema.name));
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

  async function onFormModalChange(props: {
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
      <FormModal
        schema={schema}
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
              isDisabled={Object.keys(checkedRows).length === 0}
              onClick={deleteSelected}
              title="선택한 항목을 삭제합니다."
            />
            <AddButton onClick={prepareInsert} />
            <Button
              onClick={() => {
                refreshData();
              }}
            >
              새로고침
            </Button>
          </BaseButtonGroups>
        }
      >
        <Flex direction="column" width="100%" height="100%">
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
