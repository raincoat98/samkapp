import { useHistory } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { setting } from "utils/icons";
import Moment from "react-moment";
import {
  useColorMode,
  useMediaQuery,
  useColorModeValue,
  Image,
  Box,
  Flex,
  Divider,
  Center,
  CloseButton,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import SidebarMenu from "./SidebarMenu";
import { menuBackground, borderColor } from "theme";

export default function Sidebar(props: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const bgColor = useColorModeValue(menuBackground.light, menuBackground.dark);
  const borColor = useColorModeValue(borderColor.light, borderColor.dark);

  const { colorMode } = useColorMode();
  const [isLandscape] = useMediaQuery("(orientation: landscape)");
  const logo = useSelector((state: RootState) => state.system.logo);
  const history = useHistory();

  return (
    <Flex
      display={props.isOpen ? "flex" : "none"}
      flexDir={"column"}
      w={isLandscape ? 250 : "100%"}
      p={5}
      // 우측 외곽선
      borderRightWidth={1}
      borderColor={borColor}
      bgColor={bgColor}
    >
      <Center>{!isLandscape && <CloseButton onClick={props.onClose} />}</Center>
      <Center w={"100%"} maxH={100}>
        <Image
          src={logo}
          maxH="100%"
          pb={5}
          filter={colorMode === "dark" ? "contrast(0%) brightness(2)" : ""}
          userSelect="none"
        />
      </Center>

      <Divider />

      {/* 사이드바 메뉴 */}
      <SidebarMenu onClose={props.onClose} />

      <Divider />

      <Flex marginTop={3} align="center">
        <IconButton
          icon={<Icon as={setting} />}
          onClick={() => {
            history.push("/setting");
            if (!isLandscape) props.onClose();
          }}
          borderWidth={1}
          borderColor={borColor}
          width="fit-content"
          aria-label="설정"
        />
        <Box flex="1" textAlign="center">
          <Box>
            <Moment format="YYYY년 MM월 DD일" interval={60} />
          </Box>
          <Box>
            <Moment format="a h시 m분" interval={10} locale="ko-kr" />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
