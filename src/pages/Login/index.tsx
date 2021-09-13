import React, { FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { login } from "store/realm";
import * as icons from "utils/icons";
import LoginErrorAlert from "./LoginErrorAlert";
import SwitchColorMode from "./SwitchColorMode";
import {
  Center,
  Stack,
  Heading,
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
} from "@chakra-ui/react";

export default function Login() {
  const dispatch = useDispatch();

  const appName = useSelector((state: RootState) => state.system.appName);
  const errorCode = useSelector((state: RootState) => state.realm.errorCode);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordShow, setPasswordShow] = React.useState(false);

  function togglePasswordShow(event: FormEvent) {
    event.preventDefault();
    setPasswordShow(!passwordShow);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(login({ email, password }));
  }

  return (
    <Center w={"100%"} h={"100%"}>
      {errorCode ? <LoginErrorAlert errorCode={errorCode} /> : null}

      <form action="" onSubmit={onSubmit}>
        <Stack spacing={5} p={10} borderWidth={1} rounded="md" boxShadow="xl">
          <Heading size="md">{appName}에 오신 것을 환영합니다.</Heading>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={icons.id} />}
            />
            <Input
              placeholder="이메일"
              autoComplete="username"
              isRequired={true}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={icons.password} />}
            />
            <Input
              type={passwordShow ? "text" : "password"}
              placeholder="비밀번호"
              autoComplete="current-password"
              pr="4.5rem"
              isRequired={true}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={togglePasswordShow}>
                {passwordShow ? "숨기기" : "보기"}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button type="submit" colorScheme="blue">
            로그인
          </Button>
        </Stack>
      </form>

      <SwitchColorMode />
    </Center>
  );
}
