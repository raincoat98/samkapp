import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalProps,
  Portal,
} from "@chakra-ui/react";
import { HeaderAndFooterProps } from "../props";

export default function ModalComponent(
  props: ModalProps & HeaderAndFooterProps
) {
  const { children, headerChildren, footerChildren, ...rest } = props;

  return (
    <Portal>
      <Modal {...rest}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{headerChildren}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>{footerChildren}</ModalFooter>
        </ModalContent>
      </Modal>
    </Portal>
  );
}
