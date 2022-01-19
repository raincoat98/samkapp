import { Cell } from "react-table";
import { useColorModeValue, Td, TableCellProps } from "@chakra-ui/react";
import { borderColor } from "utils/colors";

export default function TableDataCell(props: TableCellProps & { cell: Cell }) {
  const { cell, ...rest } = props;
  return (
    <Td
      {...cell.getCellProps()}
      display="block"
      overflow="hidden"
      textOverflow="ellipsis"
      whiteSpace="nowrap"
      padding={3}
      margin={0}
      textAlign="center"
      alignItems="center"
      justifyContent="center"
      // 외곽선
      borderColor={useColorModeValue(borderColor.light, borderColor.dark)}
      borderBottomWidth={1}
      _notFirst={{ borderLeftWidth: 1 }}
      {...rest}
    >
      {cell.render("Cell")}
    </Td>
  );
}
