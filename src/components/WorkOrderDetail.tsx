import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

type WorkOrderDetailProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WorkOrderDetail(props: WorkOrderDetailProps) {
  const workOrder = useSelector((state: RootState) => state.workOrder.selected);

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>작업 지시서 상세</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button variant="ghost" colorScheme="green">
            엑셀 파일로 저장
          </Button>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
