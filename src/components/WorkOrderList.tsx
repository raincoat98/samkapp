import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
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
  Tfoot,
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
} from "@chakra-ui/react";
import WorkOrderWrite from "./WorkOrderWrite";

export function WorkOrderListTable() {
  const workOrderList = useSelector(
    (state: RootState) => state.workOrder.workOrderList
  );

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>거래처</Th>
          <Th>품명</Th>
          <Th>칼라</Th>
          <Th>지종</Th>
          <Th>수량</Th>
        </Tr>
      </Thead>
      <Tbody>
        {workOrderList.map((workOrder, index) => (
          <Tr data-id={workOrder.id} key={index}>
            <Td>{workOrder.companyName}</Td>
            <Td>{workOrder.productName}</Td>
            <Td>{workOrder.productColor}</Td>
            <Td>{workOrder.productType}</Td>
            <Td>{workOrder.quantity}</Td>
          </Tr>
        ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>거래처</Th>
          <Th>품명</Th>
          <Th>지종</Th>
          <Th>칼라</Th>
          <Th>수량</Th>
        </Tr>
      </Tfoot>
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
      <Modal isOpen={isOpen} onClose={onClose}>
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
