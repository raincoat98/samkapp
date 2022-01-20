import React, { FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { login } from "store/realm";
import * as icons from "utils/icons";
import { contentBackground } from "utils/colors";
import SwitchColorMode from "./SwitchColorMode";
import {
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

  const [userId, setUserId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordShow, setPasswordShow] = React.useState(false);

  const contentBackgroundValue = useColorModeValue(
    contentBackground.light,
    contentBackground.dark
  );

  function togglePasswordShow(event: FormEvent) {
    event.preventDefault();
    setPasswordShow(!passwordShow);
  }

  return (
    <Center w={"100%"} h={"100%"}>
      <Box
        p={10}
        borderWidth={1}
        bgColor={contentBackgroundValue}
        rounded={"lg"}
      >
        <Box display={"flex"} w={"100%"} justifyContent={"center"}>
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
            dispatch(login({ id: userId, password }));
          }}
          action=""
        >
          <FormControl isRequired={true}>
            <Stack spacing={5}>
              <Heading size={"md"}>{appName}에 오신 것을 환영합니다.</Heading>

              <InputGroup>
                <InputLeftElement
                  pointerEvents={"none"}
                  children={<Icon as={icons.id} />}
                />
                <Input
                  id={"user-id"}
                  placeholder={"아이디"}
                  autoComplete={"username"}
                  onChange={(event) => setUserId(event.target.value)}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement
                  pointerEvents={"none"}
                  children={<Icon as={icons.password} />}
                />
                <Input
                  id={"password"}
                  type={passwordShow ? "text" : "password"}
                  placeholder={"비밀번호"}
                  autoComplete={"current-password"}
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

              <Button type={"submit"} colorScheme={"blue"}>
                로그인
              </Button>
            </Stack>
          </FormControl>
        </chakra.form>
      </Box>

      <SwitchColorMode />
    </Center>
  );
}
