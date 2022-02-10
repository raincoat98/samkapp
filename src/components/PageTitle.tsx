import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { toggleSidebar } from "store/system";
import { menu } from "utils/icons";
import { menuBackground, borderColor } from "theme";
import {
  chakra,
  useColorModeValue,
  Flex,
  Heading,
  Spacer,
  IconButton,
  Icon,
  Tooltip,
} from "@chakra-ui/react";

export default function PageTitle(props: {
  children: ReactNode;
  title: string;
}) {
  const { children, title } = props;

  const isSidebarOpen = useSelector(
    (state: RootState) => state.system.isSidebarOpen
  );
  const dispatch = useDispatch();

  const bgColor = useColorModeValue(menuBackground.light, menuBackground.dark);
  const borColor = useColorModeValue(borderColor.light, borderColor.dark);

  return (
    <chakra.header
      position="sticky"
      zIndex="sticky"
      top={0}
      padding="3"
      bgColor={bgColor}
      borderBottomWidth={1}
      borderColor={borColor}
      userSelect="none"
    >
      <Flex align="center">
        <Tooltip label={isSidebarOpen ? "사이드바 닫기" : "사이드바 열기"}>
          <IconButton
            icon={<Icon as={menu} />}
            onClick={() => dispatch(toggleSidebar())}
            mr={3}
            variant="ghost"
            aria-label="사이드바 전환"
          />
        </Tooltip>
        <Heading as="h3" size="lg">
          {title}
        </Heading>
        <Spacer />
        {children}
      </Flex>
    </chakra.header>
  );
}
