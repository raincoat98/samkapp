import { HeaderGroup, TableHeaderProps } from "react-table";
import { Th, Heading } from "@chakra-ui/react";
import TableSortIcon from "./TableSortIcon";

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
      textAlign="center"
      whiteSpace="pre"
      _notFirst={{ borderLeftWidth: "1px" }}
      padding={3}
      margin={0}
      {...rest}
    >
      <Heading as="h6" size="xs" display="inline-block">
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
