import { ReactNode } from "react";
import {
  useColorModeValue,
  Portal,
  AlertDialogProps,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  ButtonGroup,
  Button,
  ModalCloseButton,
} from "@chakra-ui/react";
import { modalHeaderBgColor, modalBgColor } from "theme";

export default function Dialog(props: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
  headerChildren?: ReactNode;
  footerChildren?: ReactNode;
  leastDestructiveRef?: AlertDialogProps["leastDestructiveRef"];
}) {
  const modalHeaderBgColorValue = useColorModeValue(
    modalHeaderBgColor.light,
    modalHeaderBgColor.dark
  );
  const modalBgColorValue = useColorModeValue(
    modalBgColor.light,
    modalBgColor.dark
  );

  return (
    <Portal>
      <AlertDialog
        isOpen={props.isOpen}
        onClose={props.onClose}
        leastDestructiveRef={props.leastDestructiveRef}
        isCentered={true}
        size={"sm"}
      >
        <AlertDialogOverlay>
          <AlertDialogContent overflow="hidden" borderWidth={1}>
            <ModalCloseButton />
            <AlertDialogHeader
              fontSize="md"
              fontWeight="bold"
              bgColor={modalHeaderBgColorValue}
            >
              {props.headerChildren}
            </AlertDialogHeader>
            <AlertDialogBody fontSize="md" bgColor={modalBgColorValue}>
              {props.children}
            </AlertDialogBody>
            <AlertDialogFooter padding={3}>
              <ButtonGroup size={"sm"}>
                <Button onClick={props.onClose}>취소</Button>
                <Button onClick={props.onConfirm} colorScheme={"red"}>
                  확인
                </Button>
              </ButtonGroup>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Portal>
  );
}
