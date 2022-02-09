import React from "react";
import { useDispatch } from "react-redux";
import { removeError } from "store/realm";
import { useTranslation } from "react-i18next";
import {
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";

export default function ErrorAlert(props: { error: Error }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t: translate } = useTranslation();

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
      <AlertTitle>{translate(`error.${props.error.message}`)}</AlertTitle>
      <CloseButton
        onClick={() => {
          onClose();
          dispatch(removeError());
        }}
        position="absolute"
        right="8px"
        top="8px"
      />
    </Alert>
  );
}
