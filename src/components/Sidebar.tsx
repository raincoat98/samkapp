import { Link } from "react-router-dom";
import { Icon, Box, Image, Flex, Button, Spacer } from "@chakra-ui/react";
import {
  FcHome,
  FcSupport,
  FcSettings,
  FcManager,
  FcCancel,
} from "react-icons/fc";
import { useDispatch } from "react-redux";
import MenuFrame from "./MenuFrame";
import logo from "../images/logo.png";

function Sidebar() {
  const dispatch = useDispatch();
  const onToggleLoginForm = () => {
    dispatch({ type: "system/logoutAction" });
  };

  return (
    <Flex direction={"column"} p={3} w={250} borderRightWidth="1px">
      <Box p={30}>
        <Image objectFit="contain" src={logo} />
      </Box>
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
