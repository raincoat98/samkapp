import { ReactNode } from "react";
import {
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
} from "@chakra-ui/react";

export default function Dialog(props: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: ReactNode;
  headerChildren?: ReactNode;
  footerChildren?: ReactNode;
  leastDestructiveRef?: AlertDialogProps["leastDestructiveRef"];
}) {
  return (
    <Portal>
      <AlertDialog
        isOpen={props.isOpen}
        onClose={props.onClose}
        leastDestructiveRef={props.leastDestructiveRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {props.headerChildren}
            </AlertDialogHeader>
            <AlertDialogBody>{props.children}</AlertDialogBody>
            <AlertDialogFooter>
              <ButtonGroup>
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
