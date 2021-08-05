import { useTranslation } from "react-i18next";
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

  const defaultPath = useSelector(
    (state: RootState) => state.router.defaultPath
  );

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
        px={5}
        py={10}
        size="lg"
        spacing="0"
        variant="outline"
      >
        <SidebarMenu
          menuName="Master Data Management"
          menuItemGroups={[
            {
              title: "Master Data Management",
              items: [
                "공통자료 관리",
                "Customer Management",
                "제품 관리",
                "구매 관리",
                "공정 관리",
                "설비 관리",
                "작업자 관리",
                "작업장 관리",
              ],
            },
          ]}
        />

        <Spacer />

        <SidebarMenu
          menuName="영업 관리"
          menuItemGroups={[
            {
              title: "영업 관리",
              items: [
                "입고 관리",
                "출고 관리",
                "출하 지시",
                "출하 현황",
                "판매 계획",
              ],
            },
          ]}
        />

        <Spacer />

        <SidebarMenu
          menuName="자재 관리"
          menuItemGroups={[
            {
              title: "자재 관리",
              items: ["입고 관리", "출고 관리"],
            },
            {
              title: "재고 관리",
              items: ["재고 결산", "투입 이력"],
            },
          ]}
        />

        <Spacer />

        <SidebarMenu
          menuName="생산 관리"
          menuItemGroups={[
            {
              title: "생산 관리",
              items: [
                "생산 계획",
                "생산 지시",
                "외주 지시",
                "도구 관리",
                "실적 조회",
              ],
            },
          ]}
        />

        <Spacer />

        <SidebarMenu
          menuName="설비 관리"
          menuItemGroups={[
            {
              title: "설비 관리",
              items: ["설비 점검", "점검내역"],
            },
          ]}
        />

        <Spacer />

        <SidebarMenu
          menuName="Tool Management"
          menuItemGroups={[
            {
              title: "Tool Management",
              items: [
                "Wooden Management",
                "Stash Management",
                "Typesetting Paper Management",
                "Typesetting Paper Hanger Management",
              ],
            },
          ]}
        />

        <Spacer />

        <SidebarMenu
          menuName="Monitoring"
          menuItemGroups={[
            {
              title: "Monitoring",
              items: [
                "Process Management",
                "공정작업 현황",
                "설비가동 현황",
                "생산실적 현황",
              ],
            },
          ]}
        />

        <Spacer />

        <SidebarMenu
          menuName="System Management"
          menuItemGroups={[
            {
              title: "System Management",
              items: [
                "사용자 관리",
                "부서 관리",
                "암호 변경",
                "공지사항",
                "접속 관리",
              ],
            },
          ]}
        />
      </Flex>
    </Flex>
  );
}

function SidebarMenu(props: {
  menuName: string;
  menuItemGroups: { title: string; items: string[] }[];
}) {
  const routes = useSelector((state: RootState) => state.router.routes);
  // 아이콘
  const icons = useSelector((state: RootState) => state.icon);
  const { t } = useTranslation();

  function findRouteById(routeId: string) {
    return routes[routes.findIndex((route) => route.id === routeId)];
  }

  return (
    <Menu placement="right-start">
      <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
        {t(props.menuName)}
      </MenuButton>
      <MenuList boxShadow="md" borderWidth="1px">
        {props.menuItemGroups.map((menuItemGroup, index) => (
          <MenuGroup title={t(menuItemGroup.title)} key={menuItemGroup.title}>
            {menuItemGroup.items.map((menuItemName) =>
              findRouteById(menuItemName) ? (
                <Link to={findRouteById(menuItemName).path} key={menuItemName}>
                  <MenuItem>{t(menuItemName)}</MenuItem>
                </Link>
              ) : (
                <MenuItem isDisabled={true} key={menuItemName}>
                  {t(menuItemName)}
                </MenuItem>
              )
            )}
            {props.menuItemGroups.length - 1 !== index ? (
              <MenuDivider />
            ) : undefined}
          </MenuGroup>
        ))}
      </MenuList>
    </Menu>
  );
}
