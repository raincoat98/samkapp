import React from "react";
import TableDataCell from "./TableDataCell";
import TableHeaderCell from "./TableHeaderCell";
import TableSearch from "./TableSearch";
import TablePagination from "./TablePagination";
import TableCheckbox from "./TableCheckbox";
import {
  useTable,
  useRowSelect,
  useFlexLayout,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
  Column,
  Row,
} from "react-table";
import {
  useColorModeValue,
  useMediaQuery,
  Table,
  Thead,
  Tbody,
  Tr,
  Flex,
  Box,
} from "@chakra-ui/react";
import { borderColor } from "theme";

// 테이블 특수 컬럼 아이디 (인덱스, 체크박스)
const INDEX_COLUMN = "_index";
const SELECTION_COLUMN = "_selection";

export type TableComponentProps = {
  columns?: Array<Column>;
  data: Array<any>;
  useIndex?: boolean;
  stateReducer?: any;
  onRowClick?: (row: Row<{}>) => void;
};

export default function TableComponent(props: TableComponentProps) {
  // 가로모드
  const [isLandscape] = useMediaQuery("(orientation: landscape)");

  // 외곽선 색상
  const borderColorValue = useColorModeValue(
    borderColor.light,
    borderColor.dark
  );

  // React-Table
  const memoColumns = React.useMemo(() => props.columns ?? [], [props.columns]);
  const memoData = React.useMemo(() => props.data, [props.data]);
  const tableInstance = useTable(
    {
      columns: memoColumns,
      data: memoData,
      stateReducer: props.stateReducer,
      autoResetHiddenColumns: false,
      initialState: {
        // @ts-ignore
        pageSize: 30,
      },
    },
    useFlexLayout,
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        const optionColumns = [];

        // 선택 컬럼
        optionColumns.push({
          id: SELECTION_COLUMN,
          width: "80px",
          // @ts-ignore
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <TableCheckbox {...getToggleAllPageRowsSelectedProps()} />
          ),
          // @ts-ignore
          Cell: ({ row }) => (
            <TableCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        });

        // 인덱스 컬럼
        if (props.useIndex) {
          optionColumns.push({
            id: INDEX_COLUMN,
            Header: <span>인덱스</span>,
            // @ts-ignore
            Cell: ({ row }) => <span>{row.index}</span>,
          });
        }
        return [...optionColumns, ...columns];
      });
    }
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state: tableState,
    // @ts-ignore
    page,
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    canNextPage,
    // @ts-ignore
    pageCount,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    preGlobalFilteredRows,
    // @ts-ignore
    setGlobalFilter,
  } = tableInstance;

  const searchElement = (
    <TableSearch
      preGlobalFilteredRows={preGlobalFilteredRows}
      // @ts-ignore
      globalFilter={tableState.globalFilter}
      setGlobalFilter={setGlobalFilter}
    />
  );

  // 페이지 이동 요소
  const paginationElement = (
    <TablePagination
      /* @ts-ignore */
      pageIndex={tableState.pageIndex}
      pageCount={pageCount}
      canPreviousPage={canPreviousPage}
      canNextPage={canNextPage}
      onPaging={(index: number) => gotoPage(index)}
      onPreviousPage={previousPage}
      onNextPage={nextPage}
    />
  );

  const tableElement = (
    <Table
      // react-table 프로퍼티 전달
      {...getTableProps()}
      variant={"solid"}
    >
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr
            {...headerGroup.getHeaderGroupProps()}
            borderColor={borderColorValue}
            borderTopWidth={1}
            borderBottomWidth={1}
          >
            {headerGroup.headers.map((column, index) => (
              <TableHeaderCell
                column={column}
                excludeIds={[INDEX_COLUMN, SELECTION_COLUMN]}
                key={index}
              />
            ))}
          </Tr>
        ))}
      </Thead>

      <Tbody {...getTableBodyProps()}>
        {page.map((row: Row) => {
          prepareRow(row);

          return (
            <Tr
              // react-table 프로퍼티 전달
              {...row.getRowProps()}
            >
              {row.cells.map((cell, index) => (
                <TableDataCell
                  cell={cell}
                  onClick={
                    cell.column.id !== SELECTION_COLUMN
                      ? () => {
                          if (props.onRowClick) props.onRowClick(row);
                        }
                      : undefined
                  }
                  key={index}
                />
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );

  return {
    tableInstance,
    component: {
      box: (
        <Flex flexDir="column" width="100%" height="100%" overflow="auto">
          <Box flex="1" overflow="auto">
            {tableElement}
          </Box>
          <Flex
            flexDir={isLandscape ? "row" : "column"}
            p={3}
            borderColor={borderColorValue}
            borderTopWidth={1}
          >
            <Box flex="1" pr={isLandscape ? 3 : 0} pb={isLandscape ? 0 : 3}>
              {searchElement}
            </Box>
            {paginationElement}
          </Flex>
        </Flex>
      ),
      search: searchElement,
      pagination: paginationElement,
      table: tableElement,
    },
  };
}
