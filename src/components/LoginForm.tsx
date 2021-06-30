import React from "react";
import {
  VStack,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  FormControl,
  Box,
} from "@chakra-ui/react";

import "./LoginForm.css";

function LoginForm() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box p={4}>
      <FormControl id="email">
        <VStack spacing={4}>
          <Input placeholder="아이디" />
          <InputGroup>
            <Input type={show ? "text" : "password"} placeholder="비밀번호" />
            <InputRightElement>
              <Button size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
      </FormControl>
    </Box>
  );
}

export default LoginForm;
