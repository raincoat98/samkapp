import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useTable, useGlobalFilter, useSortBy, Column } from "react-table";
import {
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Icon,
  chakra,
} from "@chakra-ui/react";

type TableComponentProps = {
  columns: Array<Column>;
  data: Array<any>;
  clickEvent?: Function;
};

export default function TableComponent(props: TableComponentProps) {
  // 정렬 아이콘
  const sortIcon = useSelector((state: RootState) => state.icon.sort);
  const upIcon = useSelector((state: RootState) => state.icon.sortUp);
  const downIcon = useSelector((state: RootState) => state.icon.sortDown);

  // 색상 가져오기
  const background = useSelector(
    (state: RootState) => state.system.color.background
  );

  const columns = React.useMemo(() => props.columns, [props.columns]);
  const data = React.useMemo(() => props.data, [props.data]);

  const { headerGroups, rows, getTableProps, getTableBodyProps, prepareRow } =
    useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <Table {...getTableProps()} wordBreak="break-all">
      <Thead
        userSelect="none"
        position="sticky"
        top="0px"
        boxShadow="base"
        bg={useColorModeValue(background.light, background.dark)}
      >
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                // @ts-ignore
                {...column.getHeaderProps(column.getSortByToggleProps())}
                textAlign="center"
              >
                {(column.isVisible = false)}
                {column.render("Header")}
                <chakra.span pl="2">
                  {/* @ts-ignore */}
                  {column.isSorted ? (
                    // @ts-ignore
                    column.isSortedDesc ? (
                      <Icon as={downIcon} />
                    ) : (
                      <Icon as={upIcon} />
                    )
                  ) : (
                    <Icon as={sortIcon} />
                  )}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr
              {...row.getRowProps()}
              onClick={() => {
                // 클릭시 원본 데이터 리턴
                if (props.clickEvent) props.clickEvent(row.original);
              }}
            >
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()} textAlign="center">
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
      <TableCaption>목록의 마지막입니다.</TableCaption>
    </Table>
  );
}
