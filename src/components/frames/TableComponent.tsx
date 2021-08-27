import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "store";
import {
  useTable,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useAsyncDebounce,
  usePagination,
  HeaderGroup,
  Column,
  Cell,
  Row,
  TableHeaderProps,
} from "react-table";
import {
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Center,
  Stack,
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  chakra,
  TableCellProps,
} from "@chakra-ui/react";

type TableComponentProps = {
  columns: Array<Column>;
  data: Array<any>;
  useIndex?: boolean;
  stateReducer?: any;
  onRowClick?: Function;
};

const INDEX_COLUMN = "_index";
const SELECTION_COLUMN = "_selection";

export default function TableComponent(props: TableComponentProps) {
  const { t } = useTranslation();

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
            Header: <span>{t("Index")}</span>,
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

  return {
    tableInstance,
    component: {
      search: (
        <TableSearch
          preGlobalFilteredRows={preGlobalFilteredRows}
          // @ts-ignore
          globalFilter={tableState.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      ),
      pagination: (
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
            <Button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              맨 뒤로
            </Button>
          </Stack>
        </Center>
      ),
      table: (
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
                  <TableHeaderCell column={column} key={index} />
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
                  onClick={(event: any) => {
                    if (props.onRowClick) {
                      if (event.target.nodeName === "INPUT") return false;
                      props.onRowClick({ event, row });
                    }
                  }}
                  _hover={{
                    background: backgroundColorSelected,
                  }}
                >
                  {row.cells.map((cell, index) => (
                    <TableDataCell cell={cell} key={index} />
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      ),
    },
  };
}

function TableHeaderCell(props: TableHeaderProps & { column: HeaderGroup }) {
  const { column, ...rest } = props;
  return (
    <Th
      // @ts-ignore
      {...column.getHeaderProps(column.getSortByToggleProps())}
      textAlign="center"
      whiteSpace="pre"
      _notFirst={{ borderLeftWidth: "1px" }}
      {...rest}
    >
      {column.render("Header")}
      {column.id !== SELECTION_COLUMN && column.id !== INDEX_COLUMN ? (
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

function TableDataCell(props: TableCellProps & { cell: Cell }) {
  const { cell, ...rest } = props;
  return (
    <Td
      {...cell.getCellProps()}
      textAlign="center"
      verticalAlign="middle"
      _notFirst={{ borderLeftWidth: "1px" }}
      {...rest}
    >
      {cell.render("Cell")}
    </Td>
  );
}

function TableSearch(props: {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
}) {
  //검색 아이콘
  const searchIcon = useSelector((state: RootState) => state.icon.search);

  const { t } = useTranslation();
  const [value, setValue] = React.useState(props.globalFilter);
  const onChange = useAsyncDebounce((value) => {
    props.setGlobalFilter(value || undefined);
  }, 200);

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={searchIcon} />}
      />
      <Input
        value={value || ""}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
        placeholder={t("Search")}
      />
    </InputGroup>
  );
}

function TableCheckbox(props: any) {
  const { indeterminate, ...rest } = props;
  return (
    <input type="checkbox" indeterminate={indeterminate.toString()} {...rest} />
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
