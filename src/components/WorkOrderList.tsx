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
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Cell, Column, Table2 } from "@blueprintjs/table";
import { Menu, MenuItem } from "@blueprintjs/core";
import { ContextMenu2 } from "@blueprintjs/popover2";

import WorkOrderWrite from "./WorkOrderWrite";
import React from "react";

export function WorkOrderListTable() {
  const workOrderList = useSelector(
    (state: RootState) => state.workOrder.workOrderList
  );

  console.log(workOrderList);

  // workOrderList.map((workOrder, index) => cells.push(<Cell>{"asd"}</Cell>));

  const cellRenderer = (rowIndex: number, columnIndex: number) => (
    <Cell>{"ㅁㅁ"}</Cell>
  );

  return (
    <ContextMenu2
      content={
        <Menu>
          <MenuItem text="Save" />
          <MenuItem text="Save as..." />
          <MenuItem text="Delete..." intent="danger" />
        </Menu>
      }
    >
      <Table2 numRows={workOrderList.length}>
        <Column name="거래처" cellRenderer={cellRenderer} />
        <Column name="품명" cellRenderer={cellRenderer} />
        <Column name="컬러" cellRenderer={cellRenderer} />
        <Column name="지종" cellRenderer={cellRenderer} />
        <Column name="수량" cellRenderer={cellRenderer} />
      </Table2>
    </ContextMenu2>
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
