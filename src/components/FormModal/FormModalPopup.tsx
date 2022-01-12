import React from "react";
import {
  useMediaQuery,
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
import { COLLECTION_NAME_TYPE } from "schema";
import WorkOrderPrint from "components/Print/WorkOrder";
import TransferOutPrint from "components/Print/TransferOut";
export default function FormModalPopup(props: {
  title: string;
  print?: {
    format: COLLECTION_NAME_TYPE;
    data: any;
  };
  isOpen: boolean;
  isSaveDisabled: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}) {
  const { title, print, isOpen, isSaveDisabled, onSubmit, onClose, children } =
    props;

  const [isLandscape] = useMediaQuery("(orientation: landscape)");
  const formEl = React.useRef<HTMLFormElement>(null);
  const [isFormVal, setIsFormVal] = React.useState(false);

  // PDF 표시 상태
  const printPopupState = useDisclosure();

  return (
    <Portal>
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
        size={isLandscape ? "2xl" : "full"}
        isCentered={isLandscape}
        scrollBehavior={isLandscape ? "inside" : "outside"}
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
            {(print?.format === "work_order" ||
              print?.format === "transfer_out") && (
              <ButtonGroup flex="1">
                <Button onClick={() => printPopupState.onOpen()}>출력</Button>
              </ButtonGroup>
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
            {/* 작업지시서 출력 */}
            {print?.format === "work_order" && (
              <WorkOrderPrint data={print.data}></WorkOrderPrint>
            )}

            {/* 출고지시서 출력 */}
            {print?.format === "transfer_out" && (
              <TransferOutPrint data={print.data}></TransferOutPrint>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Portal>
  );
}
