import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/modules";
import {
  Input,
  InputRightElement,
  InputGroup,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import ModalFrame from "./ModalFrame";

function LoginForm() {
  const dispatch = useDispatch();
  function onToggleLoginForm() {
    dispatch({ type: "system/loginAction" });
  }

  // 로그인 정보 가져오기
  const isLogin = useSelector((state: RootState) => state.system.isLogin);

  // 비밀번호 보이게 하기
  const [passwordShow, setPasswordShow] = React.useState(false);
  const togglePasswordShow = () => setPasswordShow(!passwordShow);

  return (
    <ModalFrame
      isOpen={!isLogin}
      onClose={onToggleLoginForm}
      header="로그인"
      body={
        <>
          <FormControl>
            <FormLabel>아이디</FormLabel>
            <Input placeholder="아이디" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>비밀번호</FormLabel>
            <InputGroup>
              <Input
                type={passwordShow ? "text" : "password"}
                placeholder="비밀번호"
              />
              <InputRightElement>
                <Button onClick={togglePasswordShow}>
                  {passwordShow ? "숨기기" : "보기"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </>
      }
      buttons={[
        <Button colorScheme="blue">로그인</Button>,
        <Button colorScheme="blue">비밀번호 찾기</Button>,
      ]}
    />
  );
}

export default LoginForm;
