import { ReactNode, useState, useRef } from "react";
import {
  useDisclosure,
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
import Popup from "components/Popup";
import PrintPopup from "components/Print/PrintPopup";

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
  children: ReactNode;
}) {
  // 폼 아이디
  const formId = "modal-form";

  // 폼 엘리먼트 ref
  const formEl = useRef<HTMLFormElement>(null);

  // 폼 입력 후에도 팝업을 열어둘지 여부
  const [isKeepOpen, setIsKeepOpen] = useState(false);

  // PDF 표시 상태
  const printPopupState = useDisclosure();

  return (
    <Portal>
      {/* 폼 팝업 */}
      <Popup
        title={props.title}
        isOpen={props.isOpen}
        onClose={props.onClose}
        children={
          <chakra.form
            ref={formEl}
            id={formId}
            onSubmit={(event) => {
              event.preventDefault();
              props.onSubmit();
              if (isKeepOpen) {
                formEl.current?.reset();
                props.onOpen();
              }
            }}
            action=""
          >
            {props.children}
          </chakra.form>
        }
        footerChildren={
          <>
            {/* 수정 화면일 때만 출력 버튼을 표시 */}
            {props.mode === "update" &&
              (props.print?.format === "work_order" ||
                props.print?.format === "transfer_out") && (
                <ButtonGroup flex="1">
                  <Button
                    onClick={() => printPopupState.onOpen()}
                    borderWidth={1}
                  >
                    출력
                  </Button>
                </ButtonGroup>
              )}

            <ButtonGroup>
              {props.mode === "insert" && (
                <Checkbox
                  borderColor="blue.500"
                  defaultChecked={isKeepOpen}
                  onChange={(event) => setIsKeepOpen(event.target.checked)}
                >
                  이어서 입력
                </Checkbox>
              )}
              <Button
                type="submit"
                form={formId}
                isDisabled={props.isSaveDisabled}
                colorScheme="blue"
              >
                저장
              </Button>
            </ButtonGroup>
          </>
        }
      ></Popup>

      <PrintPopup
        isOpen={printPopupState.isOpen}
        onClose={() => printPopupState.onClose()}
      >
        <>
          {/* 작업지시서 출력 */}
          {props.print?.format === "work_order" && (
            <WorkOrderPrint data={props.print.data}></WorkOrderPrint>
          )}
          {/* 출고지시서 출력 */}
          {props.print?.format === "transfer_out" && (
            <TransferOutPrint data={props.print.data}></TransferOutPrint>
          )}
        </>
      </PrintPopup>
    </Portal>
  );
}
