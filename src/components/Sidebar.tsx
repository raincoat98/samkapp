import { sidebar as sidebarDatas } from "../data/sidebar.json";
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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
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
        py={8}
        size="lg"
        spacing="0"
        variant="outline"
      >
        {sidebarDatas.map((sidebarData, index) => (
          <>
            <SidebarMenu
              title={sidebarData.title}
              items={sidebarData.items}
              key={index}
            />
            <Spacer />
          </>
        ))}
      </Flex>
    </Flex>
  );
}

type SidebarMenuItemType = { title: string; items: string[] };
function SidebarMenu(props: SidebarMenuItemType) {
  // 아이콘
  const icons = useSelector((state: RootState) => state.icon);
  const { t } = useTranslation();

  // 사이드바 메뉴 그룹
  function SidebarMenuGroup(props: SidebarMenuItemType) {
    return (
      <MenuGroup title={t(props.title)}>
        {props.items.map((item, index) => (
          <SidebarMenuItem name={item} key={index} />
        ))}
      </MenuGroup>
    );
  }

  // 사이드바 메뉴 아이템
  function SidebarMenuItem(props: { name: string }) {
    const routes = useSelector((state: RootState) => state.router.routes);

    function findRouteById(routeId: string) {
      return routes[routes.findIndex((route) => route.id === routeId)];
    }

    return findRouteById(props.name) ? (
      <Link to={findRouteById(props.name).path}>
        <MenuItem>{t(props.name)}</MenuItem>
      </Link>
    ) : (
      <MenuItem isDisabled={true}>{t(props.name)}</MenuItem>
    );
  }

  return (
    <Menu placement="right-start">
      {/* 메뉴 버튼 */}
      <MenuButton as={Button} rightIcon={<Icon as={icons.menu} />}>
        {t(props.title)}
      </MenuButton>
      {/* 메뉴 내용 */}
      <MenuList boxShadow="md" borderWidth="1px">
        <SidebarMenuGroup title={props.title} items={props.items} />
      </MenuList>
    </Menu>
  );
}
