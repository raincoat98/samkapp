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
  id: string;
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
        <ModalBody>{props.id}</ModalBody>
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
