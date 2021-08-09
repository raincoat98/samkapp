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
            userSelect="none"
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
                "공통자료관리",
                "Customer Management",
                "제품관리",
                "구매관리",
                "공정관리",
                "설비관리",
                "작업자관리",
                "작업장관리",
                "도구관리",
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
                "수주관리",
                "생산계획",
                "출하지시",
                "출하현황",
                "판매계획",
              ],
            },
          ]}
        />

        <Spacer />

        <SidebarMenu
          menuName="자재관리"
          menuItemGroups={[
            {
              title: "자재관리",
              items: ["입고관리", "출고관리"],
            },
            {
              title: "재고관리",
              items: ["재고결산", "투입이력"],
            },
            {
              items: [
                "자재이력",
                "제품이력",
                "자재별 재고",
                "제품별 재고",
                "재고마감",
              ],
            },
          ]}
        />

        <Spacer />

        <SidebarMenu
          menuName="생산관리"
          menuItemGroups={[
            {
              title: "생산관리",
              items: [
                "생산계획",
                "생산지시",
                "외주지시",
                "도구관리",
                "실적조회",
              ],
            },
          ]}
        />

        <Spacer />

        <SidebarMenu
          menuName="설비관리"
          menuItemGroups={[
            {
              title: "설비관리",
              items: ["설비 마스터", "설비점검", "점검내역", "점검현황"],
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
          menuName="공정관리"
          menuItemGroups={[
            {
              title: "공정관리",
              items: ["시스템 기동", "작업자로그인", "시스템설정", "도구교체"],
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
                "사용자관리",
                "부서관리",
                "암호변경",
                "공지사항",
                "접속관리",
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
              items: ["공정작업 현황", "설비가동 현황", "생산실적 현황"],
            },
          ]}
        />
      </Flex>
    </Flex>
  );
}

function SidebarMenu(props: {
  menuName: string;
  menuItemGroups: { title?: string; items: string[] }[];
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
          <MenuGroup
            title={menuItemGroup.title ? t(menuItemGroup.title) : ""}
            key={menuItemGroup.title || ""}
            userSelect="none"
          >
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
