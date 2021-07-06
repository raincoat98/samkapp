import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

function TableItem() {
  return (
    <Tr>
      <Td>이레상사</Td>
      <Td>PAD (mm)</Td>
      <Td>100</Td>
      <Td>패드</Td>
      <Td>715/915</Td>
      <Td>NONE</Td>
    </Tr>
  );
}

function TableFrame() {
  const tableItems = [];
  for (let i = 0; i < 100; i++) {
    tableItems.push(<TableItem />);
  }

  return (
    <Table variant="simple" bg={"white"}>
      <TableCaption>목록의 마지막입니다.</TableCaption>
      <Thead>
        <Tr>
          <Th>거래처</Th>
          <Th>품명</Th>
          <Th>수량</Th>
          <Th>지종</Th>
          <Th>원단규격</Th>
          <Th>칼라</Th>
        </Tr>
      </Thead>
      <Tbody>{tableItems}</Tbody>
      <Tfoot>
        <Tr>
          <Th>거래처</Th>
          <Th>품명</Th>
          <Th>수량</Th>
          <Th>지종</Th>
          <Th>원단규격</Th>
          <Th>칼라</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
}
export default TableFrame;
