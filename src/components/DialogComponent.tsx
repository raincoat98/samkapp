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

export default function Dialog(
  props: AlertDialogProps & {
    headerChildren?: React.ReactNode;
    footerChildren?: React.ReactNode;
  }
) {
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
