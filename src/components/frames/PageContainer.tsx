import { useStyleConfig, Flex, FlexProps } from "@chakra-ui/react";
import PageTitle from "./PageTitle";
import PageContent from "./PageContent";

export default function PageContainer(props: FlexProps) {
  const { children, ...rest } = props;
  const styles = useStyleConfig("PageContainer");

  return (
    <Flex
      __css={styles}
      {...rest}
      className="page-container"
      display="flex"
      flexDirection="column"
      height="100%"
      overflow="hidden"
    >
      <PageTitle title={props.title}></PageTitle>
      <PageContent>{children}</PageContent>
    </Flex>
  );
}
