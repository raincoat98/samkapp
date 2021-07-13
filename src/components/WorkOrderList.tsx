import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  useDisclosure,
  Button,
  IconButton,
  Box,
  Heading,
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
  ModalFooter,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
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
          <Tr key={index}>
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

  function add() {
    dispatch({
      type: "work-order/addWorkOrder",
      payload: {
        companyName: "이레상사",
        productName: "PAD (mm)",
        productColor: "NONE",
        productType: "패드",
        quantity: 10,
      },
    });
  }

  return (
    <Box onClick={add}>
      <IconButton
        aria-label="작업 지시서 작성"
        icon={<AiOutlineEdit />}
        onClick={onOpen}
        size="lg"
        position="absolute"
        bottom={5}
        right={5}
        colorScheme="blue"
        borderRadius="full"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>작업 지시서 작성</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WorkOrderWrite />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              저장
            </Button>
            <Button>닫기</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Heading variant="page-title">작업 지시서</Heading>
      <WorkOrderListTable />
    </Box>
  );
}
