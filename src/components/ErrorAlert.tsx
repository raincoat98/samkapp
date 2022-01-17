import React from "react";
import {
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

export default function ErrorAlert(props: { error: any }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 오류 감지
  React.useEffect(() => {
    if (props.error) onOpen();
    else onClose();
  }, [onClose, onOpen, props.error]);

  return (
    <Alert
      display={isOpen ? "flex" : "none"}
      status="error"
      justifyContent="center"
      textAlign="center"
    >
      <AlertIcon />
      <AlertTitle mr={2}>{props.error.message}</AlertTitle>
      <AlertDescription>
        오류가 발생했습니다. 다시 시도해주세요.
      </AlertDescription>
      <CloseButton
        onClick={() => onClose()}
        position="absolute"
        right="8px"
        top="8px"
      />
    </Alert>
  );
}
