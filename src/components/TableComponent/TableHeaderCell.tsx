import { HeaderGroup, TableHeaderProps } from "react-table";
import { useColorModeValue, Th, Heading } from "@chakra-ui/react";
import TableSortIcon from "./TableSortIcon";
import {
  tableHeaderBgColor,
  tableHeaderBgColorHover,
  borderColor,
} from "utils/colors";

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
      // 배경색
      bgColor={useColorModeValue(
        tableHeaderBgColor.light,
        tableHeaderBgColor.dark
      )}
      // 외곽선
      borderColor={useColorModeValue(borderColor.light, borderColor.dark)}
      _notFirst={{ borderLeftWidth: 1 }}
      // 마우스 오버
      _hover={{
        // 배경색
        bgColor: useColorModeValue(
          tableHeaderBgColorHover.light,
          tableHeaderBgColorHover.dark
        ),
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
