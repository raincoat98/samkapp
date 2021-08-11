import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  useTable,
  useRowSelect,
  useGlobalFilter,
  useSortBy,
  Column,
  TableInstance,
} from "react-table";
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
  Checkbox,
} from "@chakra-ui/react";

type TableComponentProps = {
  columns: Array<Column>;
  data: Array<any>;
  onClick?: Function;
  onSelect?: Function;
  onDelete?: Function;
  stateReducer?: any;
};

let tableInstance: TableInstance;

export function getTableInstance() {
  return tableInstance;
}

export default function TableComponent(props: TableComponentProps) {
  // 색상 가져오기
  const background = useSelector(
    (state: RootState) => state.system.color.background
  );
  const backgroundSelected = useSelector(
    (state: RootState) => state.system.color.backgroundSelected
  );
  const backgroundColor = useColorModeValue(background.light, background.dark);
  const backgroundColorSelected = useColorModeValue(
    backgroundSelected.light,
    backgroundSelected.dark
  );

  // React-Table
  const memoColumns = React.useMemo(() => props.columns, [props.columns]);
  const memoData = React.useMemo(() => props.data, [props.data]);
  tableInstance = useTable(
    {
      columns: memoColumns,
      data: memoData,
      stateReducer: props.stateReducer,
    },
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    // @ts-ignore
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          // @ts-ignore
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox
              onChange={getToggleAllRowsSelectedProps().onChange}
              checked={getToggleAllRowsSelectedProps().checked}
              isIndeterminate={getToggleAllRowsSelectedProps().indeterminate}
            />
          ),
          Cell: ({ row }) => (
            <Checkbox
              // @ts-ignore
              onChange={row.getToggleRowSelectedProps().onChange}
              // @ts-ignore
              checked={row.getToggleRowSelectedProps().checked}
            />
          ),
        },
        ...columns,
      ]);
    }
  );
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow } =
    tableInstance;

  return (
    <Table wordBreak="break-all" {...getTableProps()}>
      <Thead
        style={{
          userSelect: "none",
          position: "sticky",
          top: "0px",
        }}
        zIndex="docked"
        boxShadow="base"
        bg={backgroundColor}
      >
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                textAlign="center"
                // @ts-ignore
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {(column.isVisible = false)}
                {column.render("Header")}
                {column.id !== "selection" ? (
                  <TableSortIcon
                    // @ts-ignore
                    isSorted={column.isSorted}
                    // @ts-ignore
                    isSortedDesc={column.isSortedDesc}
                  />
                ) : null}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {tableInstance.rows.map((row) => {
          prepareRow(row);
          return (
            <Tr
              {...row.getRowProps()}
              onClick={() => {
                // 클릭시 원본 데이터 리턴
                if (props.onClick) props.onClick(row.original);
              }}
              _hover={{
                background: backgroundColorSelected,
              }}
            >
              {row.cells.map((cell) => (
                <Td
                  {...cell.getCellProps()}
                  style={{
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
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

function TableSortIcon(props: { isSorted: boolean; isSortedDesc: boolean }) {
  // 정렬 아이콘
  const sortIcon = useSelector((state: RootState) => state.icon.sort);
  const upIcon = useSelector((state: RootState) => state.icon.sortUp);
  const downIcon = useSelector((state: RootState) => state.icon.sortDown);

  return (
    <chakra.span pl="2">
      {/* @ts-ignore */}
      {props.isSorted ? (
        // @ts-ignore
        props.isSortedDesc ? (
          <Icon as={downIcon} />
        ) : (
          <Icon as={upIcon} />
        )
      ) : (
        <Icon as={sortIcon} />
      )}
    </chakra.span>
  );
}
