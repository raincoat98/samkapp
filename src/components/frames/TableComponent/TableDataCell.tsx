import { Cell } from "react-table";
import { Td, TableCellProps } from "@chakra-ui/react";

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
      {cell.render("Cell")}
    </Td>
  );
}
