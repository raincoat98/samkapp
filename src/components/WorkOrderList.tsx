import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

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
    <Box>
      <Heading p={3} onClick={add}>
        작업 지시서
      </Heading>
      <WorkOrderListTable />
    </Box>
  );
}
