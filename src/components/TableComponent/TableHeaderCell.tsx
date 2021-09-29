import { HeaderGroup, TableHeaderProps } from "react-table";
import { Th, Heading } from "@chakra-ui/react";
import TableSortIcon from "./TableSortIcon";

export default function TableHeaderCell(
  props: TableHeaderProps & { column: HeaderGroup; excludeIds?: string[] }
) {
  const { column, excludeIds, ...rest } = props;
  return (
    <Th
      // @ts-ignore
      {...column.getHeaderProps(column.getSortByToggleProps())}
      textAlign="center"
      whiteSpace="pre"
      _notFirst={{ borderLeftWidth: "1px" }}
      {...rest}
    >
      <Heading as="h6" size="xs" display="inline-block">
        {column.render("Header")}
      </Heading>

      {!excludeIds?.includes(column.id) ? (
        <TableSortIcon
          // @ts-ignore
          isSorted={column.isSorted}
          // @ts-ignore
          isSortedDesc={column.isSortedDesc}
        />
      ) : null}
    </Th>
  );
}
