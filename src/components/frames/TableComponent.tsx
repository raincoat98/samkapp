import React from "react";
import { useTranslation } from "react-i18next";
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
  MenuItem,
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

  // 정렬 아이콘
  const sortIcon = useSelector((state: RootState) => state.icon.sort);
  const upIcon = useSelector((state: RootState) => state.icon.sortUp);
  const downIcon = useSelector((state: RootState) => state.icon.sortDown);

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

  // 셀렉트 모드
  const [selectMode, setSelectMode] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<any[]>([]);
  const [selectedRowData, setSelectedRowData] = React.useState<any[]>([]);

  // 컨텍스트 메뉴
  const [contextMenuActive, setContextMenuActive] = React.useState(false);
  const [contextMenuPosition, setContextMenuPosition] = React.useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const columns = React.useMemo(() => props.columns, [props.columns]);
  const data = React.useMemo(() => props.data, [props.data]);

  const { headerGroups, rows, getTableProps, getTableBodyProps, prepareRow } =
    useTable({ columns, data }, useGlobalFilter, useSortBy);

  function toggleSelectMode() {
    setSelectMode(!selectMode);
    deselect();
    setContextMenuActive(false);
  }

  function deselect() {
    for (let i = 0; i < selectedRow.length; i++) {
      if (selectedRow[i]?.dataset.selected)
        delete selectedRow[i]?.dataset?.selected;
    }
  }

  function deleteSelected() {
    if (props.onDelete) props.onDelete(selectedRowData);
    deselect();
    setContextMenuActive(false);
  }

  return (
    <>
      <ContextMenu
        isOpen={contextMenuActive}
        x={contextMenuPosition.x}
        y={contextMenuPosition.y}
      >
        <MenuItem onClick={toggleSelectMode}>{t("Select")}</MenuItem>
        <MenuItem onClick={deleteSelected}>{t("Delete")}</MenuItem>
      </ContextMenu>

      <Table
        {...getTableProps()}
        wordBreak="break-all"
        onClick={() => {
          setContextMenuActive(false);
        }}
      >
        <Thead
          userSelect="none"
          position="sticky"
          top="0px"
          boxShadow="base"
          bg={backgroundColor}
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
        <Tbody
          {...getTableBodyProps()}
          cursor={selectMode ? "pointer" : "default"}
        >
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                onClick={(event: any) => {
                  if (selectMode) {
                    const rowElement = event.target.closest("tr");
                    if (!rowElement.dataset.selected) {
                      setSelectedRow([...selectedRow, rowElement]);
                      setSelectedRowData([...selectedRowData, row.original]);
                      rowElement.dataset.selected = true;
                    } else {
                      delete rowElement.dataset.selected;
                    }
                  } else {
                    // 클릭시 원본 데이터 리턴
                    if (props.clickEvent) props.clickEvent(row.original);
                  }
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
                _selected={{
                  background: backgroundColorSelected,
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
    </>
  );
}
