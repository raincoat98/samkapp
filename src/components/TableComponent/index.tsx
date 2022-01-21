import React from "react";
import TableDataCell from "./TableDataCell";
import TableHeaderCell from "./TableHeaderCell";
import TableSearch from "./TableSearch";
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
  Checkbox,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import {
  tableBgColor,
  tableRowBgColor,
  tableRowBgColorStriped,
  tableRowBgColorHover,
  borderColor,
} from "theme";
import { arrowBack, arrowForward, caretLeft, caretRight } from "utils/icons";

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

  // 테이블 열 배경색
  const tableRowBgColorValue = useColorModeValue(
    tableRowBgColor.light,
    tableRowBgColor.dark
  );

  // 테이블 열 배경색 (스트라이프 무늬)
  const tableRowBgColorStripedValue = useColorModeValue(
    tableRowBgColorStriped.light,
    tableRowBgColorStriped.dark
  );

  // 테이블 열 배경색 (마우스 오버)
  const tableRowBgColorHoverValue = useColorModeValue(
    tableRowBgColorHover.light,
    tableRowBgColorHover.dark
  );

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

  // 페이지 이동 요소
  const paginationElement = (
    <Center>
      <Stack direction="column" spacing={3} isInline={true}>
        <IconButton
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          icon={<Icon as={arrowBack} />}
          aria-label="맨 앞으로"
          title="맨 앞으로"
        />
        <IconButton
          onClick={previousPage}
          isDisabled={!canPreviousPage}
          icon={<Icon as={caretLeft} />}
          aria-label="이전"
          title="이전"
        />
        <Center>
          {/* @ts-ignore */}
          {`${tableState.pageIndex + 1} / ${
            pageOptions.length === 0 ? 1 : pageOptions.length
          }`}
        </Center>
        <IconButton
          onClick={nextPage}
          isDisabled={!canNextPage}
          icon={<Icon as={caretRight} />}
          aria-label="다음"
          title="다음"
        />
        <IconButton
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          icon={<Icon as={arrowForward} />}
          aria-label="맨 뒤로"
          title="맨 뒤로"
        />
      </Stack>
    </Center>
  );

  const tableElement = (
    <Table
      // react-table 프로퍼티 전달
      {...getTableProps()}
      // 테이블 배경색
      bgColor={useColorModeValue(tableBgColor.light, tableBgColor.dark)}
      wordBreak="break-all"
    >
      <Thead position={"sticky"} top={0} zIndex="docked" userSelect={"none"}>
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
              // react-table 프로퍼티 전달
              {...row.getRowProps()}
              // 배경색
              bgColor={tableRowBgColorValue}
              _even={{
                bgColor: tableRowBgColorStripedValue,
              }}
              _hover={{
                bgColor: tableRowBgColorHoverValue,
              }}
            >
              {row.cells.map((cell, index) => (
                <TableDataCell
                  cell={cell}
                  onClick={(event) => {
                    // 체크박스 관리 행일 때는 이벤트 취소
                    if (cell.column.id === SELECTION_COLUMN) return;
                    if (props.onRowClick) props.onRowClick(row);
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
            direction={isLandscape ? "row" : "column"}
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

function TableCheckbox(props: {
  checked: boolean;
  indeterminate: boolean;
  onChange: (checkbox: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { checked, indeterminate, onChange } = props;

  const borderColorValue = useColorModeValue(
    borderColor.light,
    borderColor.dark
  );

  return (
    <Checkbox
      isChecked={checked}
      isIndeterminate={indeterminate}
      onChange={(e) => onChange(e)}
      borderColor={borderColorValue}
      verticalAlign="center"
    />
  );
}
