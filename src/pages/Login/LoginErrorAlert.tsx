import { useTranslation } from "react-i18next";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export default function LoginErrorAlert(props: { errorCode: string }) {
  const { t: translate } = useTranslation();

  const { errorCode } = props;

  return (
    <Alert status="error" position="absolute" top="0px" left="0px">
      <AlertIcon />
      <AlertTitle mr={2}>{translate(`error_code.${errorCode}`)}</AlertTitle>
      <AlertDescription>다시 로그인 해주세요.</AlertDescription>
    </Alert>
  );
}
