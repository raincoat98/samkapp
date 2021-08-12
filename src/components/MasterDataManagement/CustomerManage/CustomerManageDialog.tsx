import Dialog from "../../frames/DialogComponent";
import { HeaderAndFooterProps } from "../../props";
import { AlertDialogProps } from "@chakra-ui/react";

export default function CustomerManageDialog(
  props: AlertDialogProps & HeaderAndFooterProps
) {
  return (
    <Dialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      leastDestructiveRef={props.leastDestructiveRef}
      headerChildren={props.headerChildren}
      footerChildren={props.footerChildren}
    >
      Are you sure? You can't undo this action afterwards.
    </Dialog>
  );
}
