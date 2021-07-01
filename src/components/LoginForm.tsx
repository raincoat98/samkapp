import React from "react";
import {
  useDisclosure,
  VStack,
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

interface Props {
  isOpen: boolean
};

class LoginForm extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  // 비밀번호 보이게 하기
  const [passwordShow, setPasswordShow] = React.useState(false);
  const togglePasswordShow = () => setPasswordShow(!passwordShow);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
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
    </>
  );
}

export default LoginForm;
