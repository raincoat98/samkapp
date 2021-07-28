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
        <Link to={router.clientManage.path}>
          <Button w={"100%"}>거래처 관리</Button>
        </Link>

        <Spacer />

        <Menu>
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            생산 관리
          </MenuButton>
          <MenuList>
            <MenuGroup title="생산 지시">
              <MenuItem>작업 지시</MenuItem>
              <MenuItem>외주 가공</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="생산 실행">
              <MenuItem>생산 실적</MenuItem>
              <MenuItem>불량처리</MenuItem>
              <MenuItem>자재투입</MenuItem>
              <MenuItem>작업장 관리</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem>일정 관리</MenuItem>
          </MenuList>
        </Menu>

        <Spacer />

        <Link to={router.workCondition.path}>
          <Button w={"100%"}>설비 관리</Button>
        </Link>

        <Spacer />

        <Menu>
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            공급업체 관리
          </MenuButton>
          <MenuList>
            <MenuItem>목형</MenuItem>
            <MenuItem>조판지</MenuItem>
          </MenuList>
        </Menu>

        <Spacer />

        <Menu>
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            재고 관리
          </MenuButton>
          <MenuList>
            <MenuItem>입고 관리</MenuItem>
            <MenuItem>출고 관리</MenuItem>
            <MenuItem>재고결산</MenuItem>
          </MenuList>
        </Menu>

        <Spacer />

        <Menu>
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            출하 관리
          </MenuButton>
          <MenuList>
            <MenuItem>출하지시</MenuItem>
            <MenuItem>출하처리</MenuItem>
          </MenuList>
        </Menu>

        <Spacer />

        <Menu>
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            목형 관리
          </MenuButton>
          <MenuList>
            <MenuItem>목형 관리</MenuItem>
            <MenuItem>적재 관리</MenuItem>
          </MenuList>
        </Menu>

        <Spacer />

        <Menu>
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            조판지 관리
          </MenuButton>
          <MenuList>
            <MenuItem>조판지 관리</MenuItem>
            <MenuItem>적재 관리</MenuItem>
          </MenuList>
        </Menu>

        <Spacer />

        <Menu>
          <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
            기준정보 관리
          </MenuButton>
          <MenuList>
            <MenuItem>제품 마스터</MenuItem>
            <MenuItem>자재 마스터</MenuItem>
            <MenuItem>사원 정보</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
