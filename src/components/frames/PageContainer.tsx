import { useStyleConfig, Flex, FlexProps } from "@chakra-ui/react";
import PageTitle from "./PageTitle";
import PageContent from "./PageContent";

export default function PageContainer(
  props: FlexProps & { headerChildren?: React.ReactNode }
) {
  const { children, headerChildren, ...rest } = props;
  const styles = useStyleConfig("PageContainer");

  return (
    <Flex
      __css={styles}
      {...rest}
      display="flex"
      flexDirection="column"
      height="100%"
      overflow="hidden"
    >
      <PageTitle title={props.title}>{headerChildren}</PageTitle>
      <PageContent>{children}</PageContent>
    </Flex>
  );
}

export function Container(props: FlexProps) {
  const { children, ...rest } = props;
  const styles = useStyleConfig("PageContainer");

  return (
    <Flex
      __css={styles}
      {...rest}
      display="flex"
      flexDirection="column"
      height="100%"
      overflow="hidden"
    >
      {children}
    </Flex>
  );
}
