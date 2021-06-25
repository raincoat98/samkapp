import React from "react";
import {
  Center,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

function LoginForm() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <div>
      <Center color="white">
        <FormControl id="email">
          <Input placeholder="아이디" />
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="비밀번호"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </FormControl>
      </Center>
    </div>
  );
}

export default LoginForm;
