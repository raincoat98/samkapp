import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import {
  useDisclosure,
  ButtonGroup,
  Button,
  Box,
  Heading,
  Flex,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Icon,
  chakra,
} from "@chakra-ui/react";
import { AiOutlineCaretUp, AiOutlineCaretDown } from "react-icons/ai";
import WorkOrderWrite from "./WorkOrderWrite";
import WorkOrderDetail from "./WorkOrderDetail";

export function WorkOrderListTable() {
  const [workOrderDetailActive, setWorkOrderDetailActive] =
    React.useState(false);

  const workOrderList = useSelector(
    (state: RootState) => state.workOrder.workOrderList
  );

  const toggleWorkOrderDetail = () => {
    setWorkOrderDetailActive(!workOrderDetailActive);
  };

  const dispatch = useDispatch();

  const data = React.useMemo(() => workOrderList, [workOrderList]);
  const columns = React.useMemo(
    () => [
      {
        Header: "거래처",
        accessor: "companyName",
      },
      {
        Header: "품명",
        accessor: "productName",
      },
      {
        Header: "색상",
        accessor: "productColor",
      },
      {
        Header: "지종",
        accessor: "productType",
      },
      {
        Header: "수량",
        accessor: "quantity",
      },
      {
        Header: "만기일",
        accessor: "dueDate",
      },
      {
        Header: "아이디",
        accessor: "id",
      },
    ],
    []
  );

  const { headerGroups, rows, getTableProps, getTableBodyProps, prepareRow } =
    // @ts-ignore (react-table 라이브러리를 타입스크립트에서 사용시 타입 관련 오류 지우기용 - 실사용엔 지장없음)
    useTable({ columns, data }, useGlobalFilter, useSortBy);

  // getToggleHideAllColumnsProps("id");

  return (
    <>
      <WorkOrderDetail
        isOpen={workOrderDetailActive}
        onClose={toggleWorkOrderDetail}
      />
      <Table {...getTableProps()} wordBreak="break-all">
        <Thead>
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
                        <Icon as={AiOutlineCaretDown} />
                      ) : (
                        <Icon as={AiOutlineCaretUp} />
                      )
                    ) : null}
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
                  dispatch({
                    type: "work-order/selectWorkOrder",
                    payload: row.original.id,
                  });
                  toggleWorkOrderDetail();
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

export default function WorkOrderList() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  function deleteAll() {
    dispatch({
      type: "work-order/deleteAllWorkOrder",
    });
  }

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>작업 지시서 작성</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WorkOrderWrite onSubmit={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Heading variant="page-title">
        <Flex align="center">
          <Box>작업 지시서</Box>
          <Spacer />
          <ButtonGroup variant="outline" spacing="3">
            <Button onClick={onOpen} colorScheme="blue">
              추가
            </Button>
            <Button onClick={deleteAll} colorScheme="red">
              삭제
            </Button>
          </ButtonGroup>
        </Flex>
      </Heading>
      <WorkOrderListTable />
    </Box>
  );
}
