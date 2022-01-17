import PageContainer from "../../components/PageContainer";
import ModalComponent from "../../components/ModalComponent";
import Profile from "./Profile";
import LicensesList from "./LicensesList";
import {
  useDisclosure,
  useColorMode,
  Stack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  StackDivider,
  Button,
  Switch,
  ButtonGroup,
} from "@chakra-ui/react";

export default function Setting() {
  const { colorMode, toggleColorMode } = useColorMode();
  const licenseModalDisclosure = useDisclosure();

  return (
    <PageContainer
      title="설정"
      headerChildren={
        <ButtonGroup spacing="3">
          <Button colorScheme="red">초기화</Button>
          <Button colorScheme="blue">저장</Button>
        </ButtonGroup>
      }
    >
      <Stack divider={<StackDivider />} spacing={3} p={3}>
        <Box>
          <Heading as="h4" size="md">
            계정
          </Heading>
          <br />
          <Profile />
        </Box>

        <Box>
          <Heading as="h4" size="md">
            시스템
          </Heading>
          <br />
          <FormControl display="flex" alignItems="center">
            <FormLabel>다크 모드</FormLabel>
            <Switch
              isChecked={colorMode === "dark"}
              onChange={toggleColorMode}
            />
          </FormControl>
        </Box>

        <Box>
          <Heading as="h4" size="md">
            기타
          </Heading>
          <br />
          <Button onClick={() => licenseModalDisclosure.onOpen()}>
            오픈소스 라이센스
          </Button>
        </Box>
      </Stack>
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
