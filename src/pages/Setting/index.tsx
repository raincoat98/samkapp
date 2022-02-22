import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { setPaddingTableValue } from "store/theme";
import PageContainer from "../../components/PageContainer";
import ModalComponent from "../../components/ModalComponent";
import Profile from "./Profile";
import LicensesList from "./LicensesList";
import {
  useDisclosure,
  useColorMode,
  Heading,
  FormControl,
  FormLabel,
  StackDivider,
  Button,
  Switch,
  Select,
  VStack,
} from "@chakra-ui/react";

export default function Setting() {
  const { colorMode, toggleColorMode } = useColorMode();
  const licenseModalDisclosure = useDisclosure();
  const theme = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  return (
    <PageContainer title="설정">
      <VStack divider={<StackDivider />} spacing={3} p={3} alignItems={"left"}>
        <VStack alignItems={"left"}>
          <SettingItemHeader>계정</SettingItemHeader>
          <Profile />
        </VStack>

        <VStack alignItems={"left"}>
          <SettingItemHeader>시스템</SettingItemHeader>

          <FormControl display="flex" alignItems="center">
            <FormLabel>다크 모드</FormLabel>
            <Switch
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
              width="auto"
            />
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel>테이블 여백</FormLabel>
            <Select
              defaultValue={theme.padding.table}
              onChange={(event) => {
                dispatch(setPaddingTableValue(Number(event.target.value)));
              }}
              width="auto"
            >
              <option value={1}>좁게</option>
              <option value={2}>보통</option>
              <option value={3}>넓게</option>
            </Select>
          </FormControl>
        </VStack>

        <VStack alignItems={"left"}>
          <SettingItemHeader>기타</SettingItemHeader>
          <Button onClick={() => licenseModalDisclosure.onOpen()}>
            오픈소스 라이센스
          </Button>
        </VStack>
      </VStack>

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

function SettingItemHeader(props: { children: string }) {
  return (
    <Heading size="md" marginBottom={3}>
      {props.children}
    </Heading>
  );
}
