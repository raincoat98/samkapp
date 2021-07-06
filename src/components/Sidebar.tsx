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
import { logoutAction } from "../store/modules/system";

function Sidebar() {
  const dispatch = useDispatch();
  const onToggleLoginForm = () => {
    dispatch(logoutAction());
  };

  return (
    <Flex direction={"column"} p={3} w={250}>
      <Box p={30}>
        <Image
          objectFit="contain"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/2560px-Samsung_Logo.svg.png"
        />
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
