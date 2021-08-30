import {
  AlertDialogProps,
  Portal,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { HeaderAndFooterProps } from "../props";

export default function Dialog(props: AlertDialogProps & HeaderAndFooterProps) {
  const { children, headerChildren, footerChildren, ...rest } = props;

  return (
    <Portal>
      <AlertDialog {...rest}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {headerChildren}
            </AlertDialogHeader>
            <AlertDialogBody>{children}</AlertDialogBody>
            <AlertDialogFooter>{footerChildren}</AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Portal>
  );
}
