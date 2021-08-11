import React from "react";
import { useStyleConfig, Flex, FlexProps } from "@chakra-ui/react";
import PageTitle from "./PageTitle";
import PageContent from "./PageContent";

export default function PageContainer(
  props: FlexProps & { headerChildren?: React.ReactNode }
) {
  const { children, headerChildren, title, ...rest } = props;
  const styles = useStyleConfig("PageContainer");

  // 페이지 이름 바꾸기
  React.useEffect(() => {
    title && (document.title = `${title} - SamKapp`);
  });

  return (
    <Flex
      __css={styles}
      {...rest}
      display="flex"
      flexDirection="column"
      height="100%"
      overflow="hidden"
    >
      <PageTitle title={title}>{headerChildren}</PageTitle>
      <PageContent>{children}</PageContent>
    </Flex>
  );
}
