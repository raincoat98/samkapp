import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
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
  Center,
  Stack,
  Flex,
  Box,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import TableDataCell from "./TableDataCell";
import TableHeaderCell from "./TableHeaderCell";
import TableSearch from "./TableSearch";

const INDEX_COLUMN = "_index";
const SELECTION_COLUMN = "_selection";

export type TableComponentProps = {
  columns?: Array<Column>;
  data?: Array<any>;
  useIndex?: boolean;
  stateReducer?: any;
  onRowClick?: Function;
};

export default function TableComponent(props: TableComponentProps) {
  const { columns, data, useIndex, stateReducer, onRowClick } = props;

  // 가로모드
  const [isLandscape] = useMediaQuery("(orientation: landscape)");

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
  const memoColumns = React.useMemo(() => columns ?? [], [columns]);
  const memoData = React.useMemo(() => data ?? [], [data]);
  const tableInstance = useTable(
    {
      columns: memoColumns,
      data: memoData,
      stateReducer,
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
        if (useIndex) {
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
    pageOptions,
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

  const paginationElement = (
    <Center>
      <Stack direction="column" spacing={3} isInline={true}>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          맨 앞으로
        </Button>
        <Button onClick={previousPage} isDisabled={!canPreviousPage}>
          이전
        </Button>
        <Center>
          {/* @ts-ignore */}
          {tableState.pageIndex + 1} / {pageOptions.length}
        </Center>
        <Button onClick={nextPage} isDisabled={!canNextPage}>
          다음
        </Button>
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          맨 뒤로
        </Button>
      </Stack>
    </Center>
  );

  const tableElement = (
    <Table {...getTableProps()} wordBreak="break-all">
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
              {...row.getRowProps()}
              _hover={{
                background: backgroundColorSelected,
              }}
            >
              {row.cells.map((cell, index) => (
                <TableDataCell
                  cell={cell}
                  onClick={(event: any) => {
                    if (cell.column.id === SELECTION_COLUMN) return;
                    if (onRowClick) {
                      onRowClick({ event, row });
                    }
                  }}
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
        <Flex direction="column" width="100%" height="100%" overflow="auto">
          <Box flex="1" overflow="auto">
            {tableElement}
          </Box>
          <Flex
            {...(isLandscape ? { direction: "row" } : { direction: "column" })}
            p={3}
          >
            <Box flex="1" {...(isLandscape ? { pr: 3 } : { pb: 3 })}>
              {searchElement}
            </Box>
            <Box>{paginationElement}</Box>
          </Flex>
        </Flex>
      ),
      search: searchElement,
      pagination: paginationElement,
      table: tableElement,
    },
  };
}

function TableCheckbox(props: {
  checked: boolean;
  indeterminate: boolean;
  onChange: Function;
}) {
  const { checked, indeterminate, onChange } = props;

  return (
    <Checkbox
      isChecked={checked}
      isIndeterminate={indeterminate}
      onChange={(e) => onChange(e)}
    ></Checkbox>
  );
}
