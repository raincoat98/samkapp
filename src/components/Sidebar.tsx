import { Link } from "react-router-dom";
import { RootState } from "../store";
import {
  useColorMode,
  Icon,
  Box,
  Image,
  Flex,
  IconButton,
  Button,
  ButtonGroup,
  Divider,
  Center,
  Spacer,
} from "@chakra-ui/react";
import {
  AiOutlineHome,
  AiOutlineContainer,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineCheck,
  AiOutlineDesktop,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";

function Sidebar() {
  const { colorMode } = useColorMode();
  const logo = useSelector((state: RootState) => state.system.logo);
  const dispatch = useDispatch();
  const onToggleLoginForm = () => {
    dispatch({ type: "system/logoutAction" });
  };

  const router = useSelector((state: RootState) => state.router);

  return (
    <Flex direction={"column"} w={250} borderRightWidth="1px">
      <Center w={"100%"} h={100}>
        <Image
          src={logo}
          filter={colorMode === "dark" ? "contrast(0%) brightness(2)" : ""}
          p="5"
        />
      </Center>

      <Divider />

      <Flex
        as={ButtonGroup}
        flex="1"
        direction="column"
        px={5}
        py={10}
        size="lg"
        variant="outline"
        spacing="0"
      >
        <Link to={router.home}>
          <Button leftIcon={<Icon as={AiOutlineHome} />} w={"100%"}>
            홈 화면
          </Button>
        </Link>

        <Spacer />

        <Link to={router.WorkOrderList}>
          <Button leftIcon={<Icon as={AiOutlineContainer} />} w={"100%"}>
            작업 지시서
          </Button>
        </Link>

        <Spacer />

        <Link to={router.WorkCondition}>
          <Button leftIcon={<Icon as={AiOutlineDesktop} />} w={"100%"}>
            작업 현황
          </Button>
        </Link>

        <Spacer />

        <Link to={router.default}>
          <Button leftIcon={<Icon as={AiOutlineCheck} />} w={"100%"}>
            버튼
          </Button>
        </Link>

        <Spacer />

        <Link to={router.setting}>
          <Button leftIcon={<Icon as={AiOutlineSetting} />} w={"100%"}>
            설정
          </Button>
        </Link>
      </Flex>

      <Divider />

      <Box p="5">
        <IconButton
          aria-label="로그인"
          icon={<Icon as={AiOutlineUser} />}
          onClick={onToggleLoginForm}
          variant="outline"
          colorScheme="blue"
          borderRadius="full"
        />
      </Box>
    </Flex>
  );
}

export default Sidebar;
