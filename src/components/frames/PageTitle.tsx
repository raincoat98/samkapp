import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  useStyleConfig,
  chakra,
  HeadingProps,
  useColorModeValue,
  Flex,
  Heading,
  Spacer,
} from "@chakra-ui/react";

export default function PageTitle(props: HeadingProps) {
  const { children, title, ...rest } = props;
  const styles = useStyleConfig("PageTitle");

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
        <Heading>{title}</Heading>
        <Spacer />
        {children}
      </Flex>
    </chakra.header>
  );
}
