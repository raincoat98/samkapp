import {
  useColorMode,
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Divider,
  Button,
  Switch,
  Select,
  InputGroup,
  Input,
} from "@chakra-ui/react";

export default function Setting() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box p={3}>
        <Heading as="h4" size="md">
          계정
        </Heading>
        <br />
        <form>
          <FormControl>
            <FormLabel>비밀번호 변경</FormLabel>
            <InputGroup>
              <Input
                id={"current-password"}
                placeholder="현재 비밀번호"
                mr={3}
              />
              <Input id={"new-password"} placeholder="변경할 비밀번호" mr={3} />
              <Button type="submit">확인</Button>
            </InputGroup>
            <FormHelperText>비밀번호 변경시에만 입력해주세요.</FormHelperText>
          </FormControl>
        </form>
      </Box>

      <Divider />

      <Box p={3}>
        <Heading as="h4" size="md">
          시스템
        </Heading>
        <br />
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
        <Heading as="h4" size="md">
          기타
        </Heading>
        <br />
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
    </>
  );
}
