import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Portal,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";

export default function FormModalPopup(props: {
  title: string;
  isOpen: boolean;
  isSaveDisabled: boolean;
  onClose: Function;
  onSubmit: Function;
  children: React.ReactNode;
}) {
  const { title, isOpen, isSaveDisabled, onSubmit, onClose, children } = props;

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
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <ButtonGroup>
                <Button
                  isDisabled={isSaveDisabled}
                  type="submit"
                  colorScheme="blue"
                >
                  저장
                </Button>
                <Button onClick={() => onClose}>닫기</Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Portal>
  );
}
