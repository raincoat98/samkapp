import { lightMode, darkMode } from "utils/icons";
import { useColorMode, Icon, IconButton, Tooltip } from "@chakra-ui/react";

export default function SwitchColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip
      hasArrow
      placement={"left"}
      label={colorMode === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      <IconButton
        icon={<Icon as={colorMode === "dark" ? lightMode : darkMode} />}
        onClick={toggleColorMode}
        position={"absolute"}
        right={5}
        bottom={5}
        boxShadow={"md"}
        aria-label={"라이트 모드 & 다크모드 전환"}
      />
    </Tooltip>
  );
}
