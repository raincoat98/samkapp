import React, { FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { login } from "store/realm";
import * as icons from "utils/icons";
import {
  useColorMode,
  Center,
  Stack,
  Heading,
  Button,
  Icon,
  IconButton,
  Tooltip,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

export default function Home() {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();

  const appName = useSelector((state: RootState) => state.system.appName);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [logInError, setLogInError] = React.useState(false);
  const [passwordShow, setPasswordShow] = React.useState(false);

  function togglePasswordShow(event: FormEvent) {
    event.preventDefault();
    setPasswordShow(!passwordShow);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLogInError(false);
    dispatch(login({ email, password }));
  }

  return (
    <Center w={"100%"} h={"100%"}>
      {logInError ? (
        <Alert status="error" position="absolute" top="0px" left="0px">
          <AlertIcon />
          <AlertTitle mr={2}>이메일 및 비밀번호가 잘못되었습니다!</AlertTitle>
          <AlertDescription>다시 로그인 해주세요.</AlertDescription>
        </Alert>
      ) : null}

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

      <Tooltip
        hasArrow
        placement="left"
        label={colorMode === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      >
        <IconButton
          icon={
            <Icon
              as={colorMode === "dark" ? icons.lightMode : icons.darkMode}
            />
          }
          onClick={toggleColorMode}
          position="absolute"
          right={5}
          bottom={5}
          aria-label="라이트 모드 & 다크모드 전환"
        />
      </Tooltip>
    </Center>
  );
}