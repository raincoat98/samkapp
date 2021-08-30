import { useTranslation } from "react-i18next";
import PageContainer from "../base/PageContainer";
import ModalComponent from "../base/ModalComponent";
import LicensesList from "./LicensesList";
import {
  useDisclosure,
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
  ButtonGroup,
} from "@chakra-ui/react";

export default function Setting() {
  const { t } = useTranslation();
  const { colorMode, toggleColorMode } = useColorMode();
  const licenseModalDisclosure = useDisclosure();

  return (
    <PageContainer
      title={t("Setting")}
      headerChildren={
        <ButtonGroup spacing="3">
          <Button colorScheme="red">{t("Reset")}</Button>
          <Button colorScheme="blue">{t("Save")}</Button>
        </ButtonGroup>
      }
    >
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
        <Divider my={3} />
        <Button onClick={licenseModalDisclosure.onOpen}>
          오픈소스 라이센스
        </Button>
      </Box>

      <ModalComponent
        headerChildren={"오픈소스 라이센스"}
        isOpen={licenseModalDisclosure.isOpen}
        onClose={licenseModalDisclosure.onClose}
      >
        <LicensesList />
      </ModalComponent>
    </PageContainer>
  );
}
