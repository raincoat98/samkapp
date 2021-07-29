import { Link } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react";

export default function NoMatch() {
  const defaultPath = useSelector(
    (state: RootState) => state.router.defaultPath
  );

  return (
    <Alert
      height="100%"
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={4} fontSize="lg">
        잘못된 접근입니다!
      </AlertTitle>
      <AlertDescription>
        <Link to={defaultPath}>
          <Button colorScheme="blue">메인 페이지로 돌아가기</Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}
