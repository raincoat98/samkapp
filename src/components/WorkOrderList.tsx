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

export function WorkOrderListTable() {
  const workOrderList = useSelector(
    (state: RootState) => state.workOrder.workOrderList
  );

  const data = React.useMemo(() => workOrderList, []);

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
        Header: "칼라",
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
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    // @ts-ignore (react-table 라이브러리를 타입스크립트에서 사용시 타입 관련 오류 지우기용 - 실사용엔 지장없음)
    useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <Table {...getTableProps()} wordBreak="break-all">
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // @ts-ignore
              <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
      <TableCaption>목록의 마지막입니다.</TableCaption>
    </Table>
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
