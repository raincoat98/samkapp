import React, { FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { login, register } from "store/realm";
import * as icons from "utils/icons";
import { contentBackground } from "theme";
import SwitchColorMode from "./SwitchColorMode";
import {
  Divider,
  Box,
  Image,
  Center,
  Stack,
  Heading,
  Button,
  Icon,
  FormControl,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  useColorModeValue,
  chakra,
} from "@chakra-ui/react";

export default function Login() {
  const dispatch = useDispatch();

  const appName = useSelector((state: RootState) => state.system.appName);
  const logo = useSelector((state: RootState) => state.system.logo);

  const [isRegister, setIsRegister] = React.useState(false);

  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordShow, setPasswordShow] = React.useState(false);

  // 회원가입 시에만
  const [name, setName] = React.useState("");

  const contentBackgroundValue = useColorModeValue(
    contentBackground.light,
    contentBackground.dark
  );

  function togglePasswordShow(event: FormEvent) {
    event.preventDefault();
    setPasswordShow(!passwordShow);
  }

  return (
    <Center width="100%" height="100%" position="relative">
      <Box
        p={10}
        borderWidth={1}
        bgColor={contentBackgroundValue}
        rounded={"lg"}
      >
        <Box display="flex" width="100%" justifyContent="center">
          <Image
            src={logo}
            w={250}
            pb={10}
            filter={useColorModeValue(undefined, "contrast(0%) brightness(2)")}
          />
        </Box>
        <chakra.form
          onSubmit={(event) => {
            event.preventDefault();
            if (isRegister) dispatch(register({ id: userId, password, name }));
            else dispatch(login({ id: userId, password }));
          }}
          action=""
        >
          <FormControl isRequired={true}>
            <Stack spacing={5}>
              <Heading size={"md"} textAlign="center">
                {appName}에 오신 것을 환영합니다.
              </Heading>

              {isRegister && (
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<Icon as={icons.user} />}
                  />
                  <Input
                    id="name"
                    placeholder="성함"
                    autoComplete="name"
                    onChange={(event) => setName(event.target.value)}
                  />
                </InputGroup>
              )}

              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={icons.id} />}
                />
                <Input
                  id="user-id"
                  placeholder="아이디"
                  autoComplete="username"
                  onChange={(event) => setUserId(event.target.value)}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={icons.password} />}
                />
                <Input
                  type={passwordShow ? "text" : "password"}
                  id="password"
                  placeholder="비밀번호"
                  autoComplete="current-password"
                  pr={"4.5rem"}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <InputRightElement width={"4.5rem"}>
                  <Button
                    h={"1.75rem"}
                    size={"sm"}
                    onClick={togglePasswordShow}
                  >
                    {passwordShow ? "숨기기" : "보기"}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Button type="submit" colorScheme={"blue"}>
                {isRegister ? "사용자 등록" : "로그인"}
              </Button>

              <Divider />

              <Button size={"sm"} onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? "로그인으로" : "사용자 등록으로"}
              </Button>
            </Stack>
          </FormControl>
        </chakra.form>
      </Box>

      <SwitchColorMode />
    </Center>
  );
}
