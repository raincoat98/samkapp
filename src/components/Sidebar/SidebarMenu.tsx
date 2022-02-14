import { useSelector } from "react-redux";
import { RootState } from "store";
import { sidebarConfig, adminSidebarConfig } from "utils/routerConfig";
import { Stack, ButtonGroup, Center } from "@chakra-ui/react";
import SidebarMenuButton from "./SidebarMenuButton";

export default function SidebarMenu(props: { onClose: () => void }) {
  const user = useSelector((state: RootState) => state.realm.user);
  const sidebarList =
    user.privilege === 10 ? adminSidebarConfig : sidebarConfig;

  return (
    <Center flex="1" overflow="auto">
      <Stack
        as={ButtonGroup}
        width="100%"
        spacing="0"
        paddingX={1}
        variant="ghost"
      >
        {sidebarList.map((sidebarRoute, index) => {
          return (
            <SidebarMenuButton
              sidebarRoute={sidebarRoute}
              onClick={props.onClose}
              key={index}
            />
          );
        })}
      </Stack>
    </Center>
  );
}
