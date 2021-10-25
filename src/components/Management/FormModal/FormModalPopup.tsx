import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Portal,
  Box,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

export default function FormModalPopup(props: {
  title: string;
  isOpen: boolean;
  isSaveDisabled: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  info?: React.ReactNode;
}) {
  const { title, isOpen, isSaveDisabled, onSubmit, onClose, children, info } =
    props;

  return (
    <Portal>
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
        isCentered={true}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader borderBottomWidth="1px">{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter borderTopWidth="1px">
            <Box flex="1">{info}</Box>
            <ButtonGroup>
              <Button
                onClick={() => onSubmit()}
                isDisabled={isSaveDisabled}
                colorScheme="blue"
              >
                저장
              </Button>
              <Button onClick={() => onClose()}>닫기</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Portal>
  );
}
