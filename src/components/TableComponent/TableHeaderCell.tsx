import { HeaderGroup, TableHeaderProps } from "react-table";
import { useColorModeValue, Th, Heading } from "@chakra-ui/react";
import TableSortIcon from "./TableSortIcon";
import { contentBackground } from "utils/colors";

export default function TableHeaderCell(
  props: TableHeaderProps & {
    column: HeaderGroup;
    excludeIds?: string[];
  }
) {
  const { column, excludeIds, ...rest } = props as TableHeaderProps & {
    column: any; // react-table 타입스크립트 문제 때문에 any로 변환
    excludeIds?: string[];
  };
  return (
    <Th
      {...column.getHeaderProps(column.getSortByToggleProps())}
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      whiteSpace="pre"
      padding={3}
      margin={0}
      // 색상
      color={useColorModeValue("black", "white")}
      // 외곽선
      borderColor={useColorModeValue("gray.300", "gray.600")}
      bgColor={useColorModeValue(
        contentBackground.light,
        contentBackground.dark
      )}
      _notFirst={{ borderLeftWidth: 1 }}
      _hover={{
        bgColor: useColorModeValue("gray.100", "black"),
      }}
      {...rest}
    >
      <Heading as="h6" size="sm" display="inline-block">
        {column.render("Header")}
      </Heading>

      {!excludeIds?.includes(column.id) ? (
        <TableSortIcon
          isSorted={column.isSorted}
          isSortedDesc={column.isSortedDesc}
        />
      ) : null}
    </Th>
  );
}
