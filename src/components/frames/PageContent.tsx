import { useStyleConfig, Box, BoxProps } from "@chakra-ui/react";

export default function PageContainer(props: BoxProps) {
  const { children, ...rest } = props;
  const styles = useStyleConfig("PageContainer");

  return (
    <Box __css={styles} {...rest} flex="1" overflow="auto">
      {children}
    </Box>
  );
}
