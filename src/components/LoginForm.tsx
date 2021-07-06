import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/modules";
import { loginAction } from "../store/modules/system";
import {
  HStack,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  FormControl,
  FormLabel,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import "./LoginForm.css";

function LoginForm() {
  const isLogin = useSelector((state: RootState) => state.system.isLogin);
  const dispatch = useDispatch();
  const onToggleLoginForm = () => {
    dispatch(loginAction());
  };

  // 비밀번호 보이게 하기
  const [passwordShow, setPasswordShow] = React.useState(false);
  const togglePasswordShow = () => setPasswordShow(!passwordShow);

  return (
    <Modal isOpen={!isLogin} onClose={onToggleLoginForm}>
      <ModalOverlay />
      <Center>
        <ModalContent>
          <ModalHeader>로그인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button colorScheme="blue">로그인</Button>
              <Button colorScheme="blue">비밀번호 찾기</Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Center>
    </Modal>
  );
}

export default LoginForm;
