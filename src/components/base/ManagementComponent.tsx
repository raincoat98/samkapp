import React from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import { Flex } from "@chakra-ui/react";
import { schemaType, schemaToColums } from "utils/realmUtils";
import TableComponent from "components/base/TableComponent";
// import FormModal from "components/base/FormModal";

export default function ManagementComponent(props: {
  tableData: any[];
  schema: schemaType;
}) {
  const { tableData, schema } = props;

  const dispatch = useDispatch();

  // 번역
  const { t: translate } = useTranslation();

  // 행
  const columns = schemaToColums(schema);
  Object.keys(columns).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(columns, key)) {
      let headerName = columns[Number(key)].Header;
      const header = translate(`table_field.${headerName as string}`);
      columns[Number(key)].Header = header;
    }
  });

  // 테이블 초기화
  const mainTable = TableComponent({
    columns,
    data: tableData,
  });

  // 초기화
  React.useEffect(() => {
    init();

    async function init() {
      // 진행 표시줄 ON
      dispatch({
        type: "system/openProgress",
      });

      // 진행 표시줄 OFF
      dispatch({
        type: "system/closeProgress",
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex direction="column" width="100%" height="100%">
      {mainTable.component.box}
    </Flex>
  );
}
