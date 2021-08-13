import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  useTable,
  useRowSelect,
  useFilters,
  useGlobalFilter,
  useSortBy,
  useAsyncDebounce,
  Column,
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
  Input,
  chakra,
} from "@chakra-ui/react";

type TableComponentProps = {
  columns: Array<Column>;
  data: Array<any>;
  onClick?: Function;
  onSelect?: Function;
  onDelete?: Function;
  stateReducer?: any;
};

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
  const INDEX_COLUMN = "_index";
  const SELECTION_COLUMN = "_selection";
  const memoColumns = React.useMemo(() => props.columns, [props.columns]);
  const memoData = React.useMemo(() => props.data, [props.data]);
  const tableInstance = useTable(
    {
      columns: memoColumns,
      data: memoData,
      stateReducer: props.stateReducer,
      autoResetHiddenColumns: false,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: SELECTION_COLUMN,
          // @ts-ignore
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <TableCheckbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            // @ts-ignore
            <TableCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        {
          id: INDEX_COLUMN,
          // @ts-ignore
          Header: <span>{t("Index")}</span>,
          Cell: ({ row }) => <span>{row.index}</span>,
        },
        ...columns,
      ]);
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state: tableState,
    // @ts-ignore
    preGlobalFilteredRows,
    // @ts-ignore
    setGlobalFilter,
  } = tableInstance;

  return {
    tableInstance,
    component: (
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
                  // @ts-ignore
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  width={column.id === SELECTION_COLUMN ? "50px" : ""}
                  textAlign="center"
                >
                  {column.id !== SELECTION_COLUMN ? (
                    <TableSortIcon
                      // @ts-ignore
                      isSorted={column.isSorted}
                      // @ts-ignore
                      isSortedDesc={column.isSortedDesc}
                    />
                  ) : null}
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
          <Tr>
            <Th colSpan={tableInstance.visibleColumns.length}>
              <TableSearch
                preGlobalFilteredRows={preGlobalFilteredRows}
                // @ts-ignore
                globalFilter={tableState.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </Th>
          </Tr>
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
    ),
  };
}

function TableSearch(props: {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
}) {
  const { t } = useTranslation();
  const count = props.preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(props.globalFilter);
  const onChange = useAsyncDebounce((value) => {
    props.setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Input
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={t("Search")}
    />
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
