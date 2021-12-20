import { useDispatch } from "react-redux";
import { toggleSidebar } from "store/system";
import { menu } from "utils/icons";
import colors from "utils/colors";
import {
  useStyleConfig,
  chakra,
  HeadingProps,
  useColorModeValue,
  Flex,
  Heading,
  Spacer,
  IconButton,
  Icon,
} from "@chakra-ui/react";

export default function PageTitle(props: HeadingProps) {
  const { children, title, ...rest } = props;
  const styles = useStyleConfig("PageTitle");

  const dispatch = useDispatch();

  // 색상 가져오기
  const bgColor = useColorModeValue(
    colors.background.light,
    colors.background.dark
  );

  return (
    <chakra.header
      __css={styles}
      {...rest}
      position="sticky"
      top="0px"
      variant="page-title"
      padding="3"
      borderBottomWidth="1px"
      bgColor={bgColor}
      transition={"var(--chakra-transition-duration-normal)"}
      userSelect="none"
      zIndex="sticky"
    >
      <Flex align="center">
        <IconButton
          icon={<Icon as={menu} />}
          onClick={() => dispatch(toggleSidebar())}
          mr={3}
          variant="ghost"
          aria-label="사이드바 전환"
        />
        <Heading as="h3" size="lg">
          {title}
        </Heading>
        <Spacer />
        {children}
      </Flex>
    </chakra.header>
  );
}
