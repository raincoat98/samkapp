import { Cell } from "react-table";
import { Td } from "@chakra-ui/react";

export default function TableDataCell(props: {
  cell: Cell;
  onClick?: () => void;
}) {
  return (
    <Td {...props.cell.getCellProps()} onClick={props.onClick}>
      {props.cell.render("Cell")}
    </Td>
  );
}
