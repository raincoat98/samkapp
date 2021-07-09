import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
} from "@chakra-ui/react";

type ModalFrameProps = {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  body: React.ReactNode;
  buttons: React.ReactNode[];
};

function ModalFrame(props: ModalFrameProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{props.body}</ModalBody>
        <ModalFooter>
          <HStack>{props.buttons}</HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalFrame;
