import { Link } from "react-router-dom";
import { RootState } from "../store";
import {
  useColorMode,
  Icon,
  Box,
  Image,
  Flex,
  Button,
  Spacer,
  Center,
} from "@chakra-ui/react";
import {
  AiOutlineHome,
  AiOutlineContainer,
  AiOutlineStop,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineCheck,
  AiOutlineDesktop,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import MenuFrame from "./frames/MenuFrame";

function Sidebar() {
  const { colorMode } = useColorMode();
  const logo = useSelector((state: RootState) => state.system.logo);
  const dispatch = useDispatch();
  const onToggleLoginForm = () => {
    dispatch({ type: "system/logoutAction" });
  };

  const router = useSelector((state: RootState) => state.router);

  return (
    <Flex direction={"column"} p={3} w={250} borderRightWidth="1px">
      <Center w={"100%"} h={100} px={2}>
        <Image
          objectFit="contain"
          src={logo}
          transition={"0.5s"}
          filter={colorMode === "dark" ? "contrast(0%) brightness(2)" : ""}
        />
      </Center>
      <Flex flex={1} direction={"column"}>
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
        <Link to={router.default}>
          <Button isDisabled leftIcon={<Icon as={AiOutlineStop} />} w={"100%"}>
            현재 사용 불가
          </Button>
        </Link>
        <Spacer />
        <MenuFrame name="메뉴" items={[{ name: "화면 캡처" }]} />
        <Spacer />
        <Link to={router.setting}>
          <Button leftIcon={<Icon as={AiOutlineSetting} />} w={"100%"}>
            설정
          </Button>
        </Link>
        <Spacer />
      </Flex>
      <Box>
        <Button
          colorScheme="facebook"
          leftIcon={<Icon as={AiOutlineUser} />}
          onClick={onToggleLoginForm}
        >
          로그인
        </Button>
      </Box>
    </Flex>
  );
}

export default Sidebar;
