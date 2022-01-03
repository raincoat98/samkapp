import React from "react";
import {
  useDisclosure,
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
import Pdf from "components/Pdf";

export default function FormModalPopup(props: {
  title: string;
  printData?: any;
  isOpen: boolean;
  isSaveDisabled: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}) {
  const {
    title,
    printData,
    isOpen,
    isSaveDisabled,
    onSubmit,
    onClose,
    children,
  } = props;

  const formEl = React.useRef<HTMLFormElement>(null);
  const [isFormVal, setIsFormVal] = React.useState(false);

  // PDF 표시 상태
  const printPopupState = useDisclosure();

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
          <ModalBody>
            <form
              ref={formEl}
              onChange={(event) => {
                if (formEl.current) {
                  //폼 유효성 검사
                  setIsFormVal(formEl.current.checkValidity());
                }
              }}
              action=""
            >
              {children}
            </form>
          </ModalBody>
          <ModalFooter borderTopWidth="1px">
            {printData ? (
              <ButtonGroup flex="1">
                <Button onClick={() => printPopupState.onOpen()}>출력</Button>
              </ButtonGroup>
            ) : (
              ""
            )}

            <ButtonGroup>
              <Button
                onClick={() => onSubmit()}
                isDisabled={!isFormVal || isSaveDisabled}
                colorScheme="blue"
              >
                저장
              </Button>
              <Button onClick={() => onClose()}>닫기</Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isOpen={printPopupState.isOpen}
        onClose={() => printPopupState.onClose()}
        size="full"
        isCentered={true}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent height="100%">
          <ModalHeader borderBottomWidth="1px">출력하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody height="100%" padding={0}>
            {printData ? <Pdf data={printData}></Pdf> : ""}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Portal>
  );
}
