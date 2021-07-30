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
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from "@chakra-ui/react";

export default function Sidebar() {
  const { colorMode } = useColorMode();
  const logo = useSelector((state: RootState) => state.system.logo);
  const routes = useSelector((state: RootState) => state.router.routes);
  const defaultPath = useSelector(
    (state: RootState) => state.router.defaultPath
  );

  // const clientManage = findRoute("clientManage");
  const toolManage = findRoute("toolManage");

  // 아이콘
  const icons = useSelector((state: RootState) => state.icon);

  function findRoute(routeId: string) {
    return routes[routes.findIndex((route) => route.id === routeId)];
  }

  return (
    <Flex direction={"column"} w={250} borderRightWidth="1px">
      <Link to={defaultPath}>
        <Center w={"100%"} h={100}>
          <Image
            src={logo}
            filter={colorMode === "dark" ? "contrast(0%) brightness(2)" : ""}
            p="5"
          />
        </Center>
      </Link>

      <Divider />

      <Flex
        as={ButtonGroup}
        flex="1"
        direction="column"
        p={5}
        size="lg"
        spacing="0"
      >
        <Menu placement="right-start">
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            기준정보 관리
          </MenuButton>
          <MenuList boxShadow="md" borderWidth="1px">
            <MenuItem>공통자료관리</MenuItem>
            <MenuItem>고객관리</MenuItem>
            <MenuItem>제품관리</MenuItem>
            <MenuItem>구매관리</MenuItem>
            <MenuItem>공정관리</MenuItem>
            <MenuItem>설비관리</MenuItem>
            <MenuItem>작업자관리</MenuItem>
            <MenuItem>작업장관리</MenuItem>
          </MenuList>
        </Menu>

        <Spacer />

        <Menu placement="right-start">
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            영업 관리
          </MenuButton>
          <MenuList boxShadow="md">
            <MenuItem>입고관리 </MenuItem>
            <MenuItem>출고관리</MenuItem>
            <MenuItem>출하지시</MenuItem>
            <MenuItem>출하현황</MenuItem>
            <MenuItem>판매계획</MenuItem>
          </MenuList>
        </Menu>

        <Spacer />

        <Menu placement="right-start">
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            자재 관리
          </MenuButton>
          <MenuList boxShadow="md">
            <MenuItem>입고 관리</MenuItem>
            <MenuItem>출고 관리</MenuItem>
            <MenuDivider />
            <MenuGroup title="재고 관리">
              <MenuItem>재고결산</MenuItem>
              <MenuItem>투입이력</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>

        <Spacer />

        <Menu placement="right-start">
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            생산 관리
          </MenuButton>
          <MenuList boxShadow="md">
            <MenuItem>생산계획</MenuItem>
            <MenuItem>생산지시</MenuItem>
            <MenuItem>외주지시</MenuItem>
            <MenuItem>도구관리</MenuItem>
            <MenuItem>실적조회</MenuItem>
          </MenuList>
        </Menu>

        <Spacer />

        <Menu placement="right-start">
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            설비 관리
          </MenuButton>
          <MenuList boxShadow="md">
            <MenuItem>설비점검</MenuItem>
            <MenuItem>점검내역</MenuItem>
          </MenuList>
        </Menu>

        <Spacer />

        <Menu placement="right-start">
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            도구 관리
          </MenuButton>
          <MenuList boxShadow="md">
            <Link to={toolManage.path + "/wooden"}>
              <MenuItem>목형관리</MenuItem>
            </Link>
            <Link to={toolManage.path + "/stash"}>
              <MenuItem>적치대관리</MenuItem>
            </Link>
            <Link to={toolManage.path + "/typesetting_paper"}>
              <MenuItem>조판지관리</MenuItem>
            </Link>
            <Link to={toolManage.path + "/typesetting_paper_hanger"}>
              <MenuItem>조판지걸이관리</MenuItem>
            </Link>
          </MenuList>
        </Menu>

        <Spacer />

        <Menu placement="right-start">
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            모니터링
          </MenuButton>
          <MenuList boxShadow="md">
            <MenuItem>공정작업 현황</MenuItem>
            <MenuItem>설비가동 현황</MenuItem>
            <MenuItem>생산실적 현황</MenuItem>
          </MenuList>
        </Menu>

        <Spacer />

        <Menu placement="right-start">
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            시스템관리
          </MenuButton>
          <MenuList boxShadow="md">
            <MenuItem>사용자관리</MenuItem>
            <MenuItem>부서관리</MenuItem>
            <MenuItem>암호변경</MenuItem>
            <MenuItem>공지사항</MenuItem>
            <MenuItem>접속관리</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
