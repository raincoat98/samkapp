import React, { FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { login, register } from "store/realm";
import * as icons from "utils/icons";
import SwitchColorMode from "./SwitchColorMode";
import {
  Box,
  Center,
  Stack,
  Heading,
  Button,
  Icon,
  FormControl,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
} from "@chakra-ui/react";

export default function Login() {
  const dispatch = useDispatch();

  const appName = useSelector((state: RootState) => state.system.appName);

  const [isRegister, setIsRegister] = React.useState(false);

  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordShow, setPasswordShow] = React.useState(false);

  function togglePasswordShow(event: FormEvent) {
    event.preventDefault();
    setPasswordShow(!passwordShow);
  }

  return (
    <Center w={"100%"} h={"100%"}>
      <Box>
        <FormControl>
          <Stack spacing={5} p={10} borderWidth={1} rounded="md" boxShadow="xl">
            <Heading size="md">{appName}에 오신 것을 환영합니다.</Heading>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={icons.id} />}
              />
              <Input
                id="user-id"
                placeholder="아이디"
                autoComplete="username"
                isRequired={true}
                onChange={(event) => setUserId(event.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={icons.password} />}
              />
              <Input
                id="password"
                type={passwordShow ? "text" : "password"}
                placeholder="비밀번호"
                autoComplete="current-password"
                pr="4.5rem"
                isRequired={true}
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={togglePasswordShow}>
                  {passwordShow ? "숨기기" : "보기"}
                </Button>
              </InputRightElement>
            </InputGroup>

            {isRegister ? (
              <Button
                onClick={() => dispatch(register({ id: userId, password }))}
                colorScheme="blue"
              >
                회원가입
              </Button>
            ) : (
              <Button
                onClick={() => dispatch(login({ id: userId, password }))}
                colorScheme="blue"
              >
                로그인
              </Button>
            )}

            {/* {isRegister ? (
              <FormHelperText>
                계정을 이미 가지고 계신가요?
                <Button
                  onClick={() => setIsRegister(!isRegister)}
                  variant="link"
                  marginLeft={2}
                >
                  로그인
                </Button>
              </FormHelperText>
            ) : (
              <FormHelperText>
                계정이 없으신가요?
                <Button
                  onClick={() => setIsRegister(!isRegister)}
                  variant="link"
                  marginLeft={2}
                >
                  회원가입
                </Button>
              </FormHelperText>
            )} */}
          </Stack>
        </FormControl>
      </Box>

      <SwitchColorMode />
    </Center>
  );
}
