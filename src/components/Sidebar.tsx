import { Link } from "react-router-dom";
import { RootState } from "../store";
import {
  Icon,
  Box,
  Image,
  Flex,
  Button,
  Spacer,
  Center,
} from "@chakra-ui/react";
import {
  FcHome,
  FcSupport,
  FcSettings,
  FcManager,
  FcCancel,
} from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import MenuFrame from "./frames/MenuFrame";

function Sidebar() {
  const isDarkTheme = useSelector(
    (state: RootState) => state.system.isDarkTheme
  );
  const logo = useSelector((state: RootState) => state.system.logo);
  const dispatch = useDispatch();
  const onToggleLoginForm = () => {
    dispatch({ type: "system/logoutAction" });
  };

  return (
    <Flex direction={"column"} p={3} w={250} borderRightWidth="1px">
      <Center w={"100%"} h={100} px={2}>
        <Image
          objectFit="contain"
          src={logo}
          transition={"0.5s"}
          filter={isDarkTheme ? "contrast(0%) brightness(2)" : ""}
        />
      </Center>
      <Flex flex={1} direction={"column"}>
        <Link to="/home">
          <Button leftIcon={<Icon as={FcHome} />} w={"100%"}>
            홈 화면
          </Button>
        </Link>
        <Spacer />
        <Link to="/">
          <Button leftIcon={<Icon as={FcSupport} />} w={"100%"}>
            버튼
          </Button>
        </Link>
        <Spacer />
        <Link to="/">
          <Button leftIcon={<Icon as={FcSupport} />} w={"100%"}>
            버튼
          </Button>
        </Link>
        <Spacer />
        <Link to="/">
          <Button leftIcon={<Icon as={FcSupport} />} w={"100%"}>
            버튼
          </Button>
        </Link>
        <Spacer />
        <Link to="/">
          <Button isDisabled leftIcon={<Icon as={FcCancel} />} w={"100%"}>
            현재 사용 불가
          </Button>
        </Link>
        <Spacer />
        <MenuFrame
          name="메뉴"
          items={["화면 캡처", "화면 캡처", "화면 캡처"]}
        />
        <Spacer />
        <Link to="/setting">
          <Button leftIcon={<Icon as={FcSettings} />} w={"100%"}>
            설정
          </Button>
        </Link>
        <Spacer />
      </Flex>
      <Box>
        <Button
          colorScheme="facebook"
          leftIcon={<Icon as={FcManager} />}
          onClick={onToggleLoginForm}
        >
          로그인
        </Button>
      </Box>
    </Flex>
  );
}

export default Sidebar;
