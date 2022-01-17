import { Cell } from "react-table";
import { useColorModeValue, Td, TableCellProps } from "@chakra-ui/react";

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
      // verticalAlign="bottom"
      // 외곽선
      borderColor={useColorModeValue("gray.300", "gray.600")}
      borderBottomWidth={1}
      _notFirst={{ borderLeftWidth: 1 }}
      {...rest}
    >
      {cell.render("Cell")}
    </Td>
  );
}
