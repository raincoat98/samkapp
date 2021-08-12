import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
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
} from "@chakra-ui/react";

export default function Home() {
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();

  const [passwordShow, setPasswordShow] = React.useState(false);
  const icon = useSelector((state: RootState) => state.icon);
  const appName = useSelector((state: RootState) => state.system.appName);

  function togglePasswordShow() {
    setPasswordShow(!passwordShow);
  }

  function login() {
    dispatch({
      type: "system/loginAction",
    });
  }

  return (
    <Center w={"100%"} h={"100%"}>
      <Stack spacing={5} p={10} borderWidth={1} rounded="md" boxShadow="xl">
        <Heading size="md">{appName}에 오신 것을 환영합니다.</Heading>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={icon.id} />}
          />
          <Input placeholder="아이디" />
        </InputGroup>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={icon.password} />}
          />
          <Input
            type={passwordShow ? "text" : "password"}
            pr="4.5rem"
            placeholder="비밀번호"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={togglePasswordShow}>
              {passwordShow ? "숨기기" : "보기"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button onClick={login} colorScheme="blue">
          로그인
        </Button>
      </Stack>

      <Tooltip
        hasArrow
        placement="left"
        label={colorMode === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      >
        <IconButton
          icon={
            <Icon as={colorMode === "dark" ? icon.lightMode : icon.darkMode} />
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
