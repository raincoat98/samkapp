import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import {
  useStyleConfig,
  useColorModeValue,
  Flex,
  FlexProps,
} from "@chakra-ui/react";
import PageTitle from "./PageTitle";
import PageContent from "./PageContent";
import { contentBackground } from "utils/colors";

export default function PageContainer(
  props: FlexProps & { headerChildren?: React.ReactNode }
) {
  const { children, headerChildren, title, ...rest } = props;
  const bgColor = useColorModeValue(
    contentBackground.light,
    contentBackground.dark
  );
  const styles = useStyleConfig("PageContainer");

  // 앱 이름 가져오기
  const appName = useSelector((state: RootState) => state.system.appName);

  // 페이지 이름 바꾸기
  React.useEffect(() => {
    title && (document.title = `${title} - ${appName}`);
  });

  return (
    <Flex
      __css={styles}
      {...rest}
      display="flex"
      flexDirection="column"
      height="100%"
      overflow="hidden"
      // 배경색
      bgColor={bgColor}
    >
      <PageTitle title={title}>{headerChildren}</PageTitle>
      <PageContent>{children}</PageContent>
    </Flex>
  );
}
