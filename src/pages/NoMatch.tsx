import { Link } from "react-router-dom";
import routerConfig from "utils/routerConfig";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
} from "@chakra-ui/react";

export default function NoMatch() {
  return (
    <Alert
      height="100%"
      status="error"
      variant="subtle"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={4} fontSize="lg">
        잘못된 접근입니다!
      </AlertTitle>
      <AlertDescription>
        <Link to={routerConfig.defaultPath}>
          <Button colorScheme="blue">메인 페이지로 돌아가기</Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}
