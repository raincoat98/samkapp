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
  Checkbox,
  chakra,
} from "@chakra-ui/react";
import { COLLECTION_NAME_TYPE } from "schema";
import { formModalModeType } from "./index";
import WorkOrderPrint from "components/Print/WorkOrder";
import TransferOutPrint from "components/Print/TransferOut";
export default function FormModalPopup(props: {
  title: string;
  mode: formModalModeType;
  print?: {
    format: COLLECTION_NAME_TYPE;
    data: any;
  };
  isOpen: boolean;
  isSaveDisabled: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}) {
  const [isLandscape] = useMediaQuery("(orientation: landscape)");
  const formEl = React.useRef<HTMLFormElement>(null);
  const [isFormVal, setIsFormVal] = React.useState(false);
  const [isKeepOpen, setIsKeepOpen] = React.useState(false);

  // PDF 표시 상태
  const printPopupState = useDisclosure();

  return (
    <Portal>
      <Modal
        isOpen={props.isOpen}
        onClose={() => props.onClose()}
        size={isLandscape ? "2xl" : "full"}
        isCentered={isLandscape}
        scrollBehavior={isLandscape ? "inside" : "outside"}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader borderBottomWidth="1px">{props.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <chakra.form
              ref={formEl}
              onChange={(event) => {
                if (formEl.current) {
                  //폼 유효성 검사
                  setIsFormVal(formEl.current.checkValidity());
                }
              }}
              action=""
            >
              {props.children}
            </chakra.form>
          </ModalBody>
          <ModalFooter borderTopWidth="1px">
            {/* 수정 화면일 때만 출력 버튼을 표시 */}
            {props.mode === "update" &&
              (props.print?.format === "work_order" ||
                props.print?.format === "transfer_out") && (
                <ButtonGroup flex="1">
                  <Button onClick={() => printPopupState.onOpen()}>출력</Button>
                </ButtonGroup>
              )}

            <ButtonGroup>
              {props.mode === "insert" && (
                <Checkbox
                  defaultChecked={isKeepOpen}
                  onChange={(event) => setIsKeepOpen(event.target.checked)}
                >
                  이어서 입력
                </Checkbox>
              )}
              <Button
                onClick={() => {
                  props.onSubmit();
                  if (isKeepOpen) {
                    formEl.current?.reset();
                    props.onOpen();
                  }
                }}
                isDisabled={!isFormVal || props.isSaveDisabled}
                colorScheme="blue"
              >
                저장
              </Button>
              <Button onClick={() => props.onClose()}>닫기</Button>
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
            {props.print?.format === "work_order" && (
              <WorkOrderPrint data={props.print.data}></WorkOrderPrint>
            )}

            {/* 출고지시서 출력 */}
            {props.print?.format === "transfer_out" && (
              <TransferOutPrint data={props.print.data}></TransferOutPrint>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Portal>
  );
}
