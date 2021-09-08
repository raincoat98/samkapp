import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { menu } from "utils/icons";
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
  const background = useSelector(
    (state: RootState) => state.system.color.background
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
      bg={useColorModeValue(background.light, background.dark)}
      transition={"var(--chakra-transition-duration-normal)"}
      userSelect="none"
      zIndex="sticky"
    >
      <Flex align="center">
        <IconButton
          icon={<Icon as={menu} />}
          onClick={() =>
            dispatch({
              type: "system/toggleSidebar",
            })
          }
          mr={3}
          variant="ghost"
          aria-label="사이드바 전환"
        />
        <Heading>{title}</Heading>
        <Spacer />
        {children}
      </Flex>
    </chakra.header>
  );
}
