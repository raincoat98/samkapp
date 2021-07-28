import { Link } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import {
  useColorMode,
  Icon,
  Image,
  Flex,
  Button,
  ButtonGroup,
  Divider,
  Center,
  Spacer,
} from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

export default function Sidebar() {
  const { colorMode } = useColorMode();
  const logo = useSelector((state: RootState) => state.system.logo);
  const router = useSelector((state: RootState) => state.router);

  // 아이콘
  const icons = useSelector((state: RootState) => state.icon);

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
        p={5}
        size="lg"
        spacing="0"
      >
        <Link to={router.operateCondition}>
          <Button leftIcon={<Icon as={icons.profile} />} w={"100%"}>
            가동 상황
          </Button>
        </Link>

        <Spacer />

        <Link to={router.lineCondition}>
          <Button leftIcon={<Icon as={icons.chart} />} w={"100%"}>
            라인 현황
          </Button>
        </Link>

        <Spacer />

        <Link to={router.workOrderList}>
          <Button leftIcon={<Icon as={icons.container} />} w={"100%"}>
            작업 지시서
          </Button>
        </Link>

        <Spacer />

        <Link to={router.workCondition}>
          <Button leftIcon={<Icon as={icons.desktop} />} w={"100%"}>
            작업 현황
          </Button>
        </Link>

        <Spacer />

        <Menu>
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            관리
          </MenuButton>
          <MenuList>
            <MenuItem>목형</MenuItem>
            <MenuItem>조판지</MenuItem>
          </MenuList>
        </Menu>

        <Spacer />

        <Link to={router.workCondition}>
          <Button leftIcon={<Icon as={icons.bussiness} />} w={"100%"}>
            거래처 관리
          </Button>
        </Link>

        <Spacer />

        <Link to={router.workCondition}>
          <Button leftIcon={<Icon as={icons.user} />} w={"100%"}>
            사용자 관리
          </Button>
        </Link>

        <Spacer />

        <Link to={router.workCondition}>
          <Button leftIcon={<Icon as={icons.desktop} />} w={"100%"}>
            KPI
          </Button>
        </Link>

        <Spacer />

        <Link to={router.setting}>
          <Button leftIcon={<Icon as={icons.setting} />} w={"100%"}>
            설정
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
