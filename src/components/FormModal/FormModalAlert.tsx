import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

export default function FormModalAlert(props: {
  isOpen: boolean;
  onClose: (isConfirmed: boolean) => void;
}) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={props.isOpen}
      onClose={() => props.onClose(false)}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            작성 취소
          </AlertDialogHeader>

          <AlertDialogBody>
            정말로 취소하시겠습니까? 수정 중이던 값은 모두 사라지게 됩니다.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => props.onClose(false)}>
              계속 작성하겠습니다.
            </Button>
            <Button
              colorScheme="red"
              onClick={() => props.onClose(true)}
              ml={3}
            >
              작성 취소
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
