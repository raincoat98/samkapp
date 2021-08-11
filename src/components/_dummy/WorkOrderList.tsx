import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  useDisclosure,
  ButtonGroup,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import PageContainer from "../frames/PageContainer";
import WorkOrderWrite from "./WorkOrderWrite";
import WorkOrderDetail from "./WorkOrderDetail";
import TableComponent from "../frames/TableComponent";

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

  const data = workOrderList;
  const columns = [
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
  ];

  function selectWorkOrder(id: string) {
    dispatch({
      type: "work-order/selectWorkOrder",
      payload: id,
    });
    toggleWorkOrderDetail();
  }

  return (
    <>
      <WorkOrderDetail
        isOpen={workOrderDetailActive}
        onClose={toggleWorkOrderDetail}
      />
      <TableComponent
        columns={columns}
        data={data}
        onClick={(original: any) => {
          selectWorkOrder(original.id);
        }}
      />
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
    <>
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

      <PageContainer
        title="작업 지시서"
        headerChildren={
          <ButtonGroup variant="outline" spacing="3">
            <Button onClick={onOpen} colorScheme="blue">
              추가
            </Button>
            <Button onClick={deleteAll} colorScheme="red">
              삭제
            </Button>
          </ButtonGroup>
        }
      >
        <WorkOrderListTable />
      </PageContainer>
    </>
  );
}
