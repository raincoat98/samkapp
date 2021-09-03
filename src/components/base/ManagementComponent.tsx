import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Flex } from "@chakra-ui/react";
import { schemaType, schemaToColums } from "utils/realmUtils";
import TableComponent from "components/base/TableComponent";

export default function ManagementComponent(props: {
  tableData: any[];
  schema: schemaType;
  onChange: Function;
  onRowClick: Function;
}) {
  const { tableData, schema, onChange, onRowClick } = props;

  // 테이블 헤더에서 제외할 것들
  const disabledSchemaKeyList = useSelector(
    (state: RootState) => state.realm.disabledSchemaKeyList
  );
  const readonlySchemaKeyList = useSelector(
    (state: RootState) => state.realm.readonlySchemaKeyList
  );

  // 번역
  const { t: translate } = useTranslation();

  // 행
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
    onRowClick,
    stateReducer: React.useCallback(
      (newState: { selectedRowIds: Record<number, boolean> }, action: any) => {
        onChange({ table: mainTable?.tableInstance, state: newState, action });
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    ),
  });

  return (
    <Flex direction="column" width="100%" height="100%">
      {mainTable.component.box}
    </Flex>
  );
}
