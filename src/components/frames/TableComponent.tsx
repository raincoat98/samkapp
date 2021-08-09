import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  useTable,
  useRowSelect,
  useGlobalFilter,
  useSortBy,
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
  chakra,
  MenuItem,
  Checkbox,
  CheckboxProps,
} from "@chakra-ui/react";
import ContextMenu from "./ContextMenu";

type TableComponentProps = {
  columns: Array<Column>;
  data: Array<any>;
  clickEvent?: Function;
  onDelete?: Function;
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

  // 컨텍스트 메뉴
  const [contextMenuActive, setContextMenuActive] = React.useState(false);
  const [contextMenuPosition, setContextMenuPosition] = React.useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  // React-Table
  const memoColumns = React.useMemo(() => props.columns, [props.columns]);
  const memoData = React.useMemo(() => props.data, [props.data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // @ts-ignore
    state: { selectedRowIds },
  } = useTable(
    {
      columns: memoColumns,
      data: memoData,
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
            <TableCheckBox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            // @ts-ignore
            <TableCheckBox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );

  function deleteSelected() {
    const selectedRows = [];
    for (let i = 0; i < rows.length; i++) {
      for (const key in selectedRowIds) {
        if (Object.prototype.hasOwnProperty.call(selectedRowIds, key)) {
          // @ts-ignore
          if (rows[i].id === key) selectedRows.push(rows[i].original.id);
        }
      }
    }
    if (props.onDelete) props.onDelete(selectedRows);
    setContextMenuActive(false);
  }

  return (
    <>
      <ContextMenu
        isOpen={contextMenuActive}
        x={contextMenuPosition.x}
        y={contextMenuPosition.y}
      >
        <MenuItem onClick={deleteSelected}>{t("Delete")}</MenuItem>
      </ContextMenu>

      <Table
        wordBreak="break-all"
        onClick={() => {
          setContextMenuActive(false);
        }}
        {...getTableProps()}
      >
        <Thead
          style={{
            userSelect: "none",
            position: "sticky",
            top: "0px",
          }}
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
                  <TableSortIcon column={column} />
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
                onContextMenu={(event: any) => {
                  event.preventDefault();
                  setContextMenuActive(true);
                  setContextMenuPosition({
                    x: event.clientX,
                    y: event.clientY,
                  });
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
    </>
  );
}

function TableSortIcon(column: any) {
  // 정렬 아이콘
  const sortIcon = useSelector((state: RootState) => state.icon.sort);
  const upIcon = useSelector((state: RootState) => state.icon.sortUp);
  const downIcon = useSelector((state: RootState) => state.icon.sortDown);

  return (
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
  );
}

function TableCheckBox(props: CheckboxProps & { indeterminate: boolean }) {
  const { indeterminate, title, ...rest } = props;
  return <Checkbox isIndeterminate={indeterminate} {...rest}></Checkbox>;
}
