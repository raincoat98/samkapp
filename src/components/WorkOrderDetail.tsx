import { useSelector, useDispatch } from "react-redux";
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
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>작업 지시서 상세</ModalHeader>
        <ModalCloseButton />
        <ModalBody>aaa</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
