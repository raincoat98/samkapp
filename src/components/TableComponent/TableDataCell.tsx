import { Cell } from "react-table";
import { Td } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "store";

export default function TableDataCell(props: {
  cell: Cell;
  onClick?: () => void;
}) {
  const tablePadding = useSelector(
    (state: RootState) => state.theme.padding.table
  );

  return (
    <Td
      {...props.cell.getCellProps()}
      onClick={props.onClick}
      padding={tablePadding}
      _hover={{
        whiteSpace: "break-spaces",
      }}
    >
      {props.cell.render("Cell")}
    </Td>
  );
}
