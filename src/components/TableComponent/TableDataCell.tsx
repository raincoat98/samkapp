import { Cell } from "react-table";
import { Td, TableCellProps, Center } from "@chakra-ui/react";

export default function TableDataCell(props: TableCellProps & { cell: Cell }) {
  const { cell, ...rest } = props;
  return (
    <Td
      {...cell.getCellProps()}
      textAlign="center"
      verticalAlign="middle"
      _notFirst={{ borderLeftWidth: "1px" }}
      {...rest}
    >
      <Center width="100%" height="100%">
        {cell.render("Cell")}
      </Center>
    </Td>
  );
}
