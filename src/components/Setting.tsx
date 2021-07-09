import {
  useColorMode,
  Divider,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Heading,
  Box,
  Tag,
  Input,
} from "@chakra-ui/react";

function Setting() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Heading p={3}>설정</Heading>

      <Box p={3}>
        <Tag>계정</Tag>
        <Divider my={3} />
        <FormControl>
          <FormLabel>비밀번호 변경</FormLabel>
          <Input placeholder="현재 비밀번호" />
          <Input placeholder="변경할 비밀번호" />
          <Button>확인</Button>
        </FormControl>
      </Box>

      <Divider />

      <Box p={3}>
        <Tag>시스템</Tag>
        <Divider my={3} />
        <FormControl display="flex" alignItems="center">
          <FormLabel>다크 모드</FormLabel>
          <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode} />
        </FormControl>
        <Divider my={3} />
        <FormControl>
          <FormLabel>사용 언어</FormLabel>
          <Select placeholder="시스템 언어">
            <option value="option1">한국어</option>
            <option value="option2">English</option>
            <option value="option3">日本語</option>
          </Select>
        </FormControl>
        <Divider my={3} />
        <FormControl>
          <FormLabel>업데이트</FormLabel>
          <Select placeholder="자동">
            <option value="option1">1</option>
            <option value="option2">2</option>
          </Select>
        </FormControl>
      </Box>

      <Divider />

      <Box p={3}>
        <Tag>기타</Tag>
        <Divider my={3} />
        <Button>홈페이지</Button>
        <Divider my={3} />
        <Button>고객문의</Button>
      </Box>

      <Divider />

      <Box p={3}>
        <FormControl>
          <Button colorScheme="red">설정 초기화</Button>
          <Button colorScheme="blue">설정 저장</Button>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Setting;
