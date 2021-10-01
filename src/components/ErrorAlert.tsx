import React from "react";
import { useTranslation } from "react-i18next";
import { RealmError } from "store/realm";
import {
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";

export default function ErrorAlert(props: { error: RealmError }) {
  const { t: translate } = useTranslation();
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
      <AlertTitle mr={2}>
        {translate(`error_code.${props.error.errorCode}.message`)}
      </AlertTitle>
      <AlertDescription>
        {translate(`error_code.${props.error.errorCode}.guide`)}
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
