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
  const { children, ...rest } = props;

  return (
    <Portal>
      <AlertDialog {...rest} isOpen={props.isOpen} onClose={props.onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {props.headerChildren}
            </AlertDialogHeader>
            <AlertDialogBody>{props.children}</AlertDialogBody>
            <AlertDialogFooter>{props.footerChildren}</AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Portal>
  );
}
