import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store";
import { toggleSidebar } from "store/system";
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
  Tooltip,
} from "@chakra-ui/react";
import SidebarMenu from "./SidebarMenu";
import { menuBackground, borderColor } from "theme";

export default function Sidebar() {
  // 사이드바 열림 여부
  const isSidebarOpen = useSelector(
    (state: RootState) => state.system.isSidebarOpen
  );
  const logo = useSelector((state: RootState) => state.system.logo);

  const bgColor = useColorModeValue(menuBackground.light, menuBackground.dark);
  const borColor = useColorModeValue(borderColor.light, borderColor.dark);

  const { colorMode } = useColorMode();
  const [isLandscape] = useMediaQuery("(orientation: landscape)");

  const dispatch = useDispatch();

  return (
    <Flex
      display={isSidebarOpen ? "flex" : "none"}
      flexDir={"column"}
      w={isLandscape ? 250 : "100%"}
      p={5}
      // 우측 외곽선
      borderRightWidth={1}
      borderColor={borColor}
      bgColor={bgColor}
    >
      <Center>
        {!isLandscape && (
          <CloseButton onClick={() => dispatch(toggleSidebar())} />
        )}
      </Center>
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
      <SidebarMenu onClose={() => dispatch(toggleSidebar())} />

      <Divider />

      <Flex marginTop={3} align="center">
        <Tooltip label="설정">
          <Link
            to={{
              pathname: "/setting",
            }}
          >
            <IconButton
              icon={<Icon as={setting} />}
              borderWidth={1}
              borderColor={borColor}
              width="fit-content"
              aria-label="설정"
            />
          </Link>
        </Tooltip>

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
