import { useEffect, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useColorModeValue, Box, Flex } from "@chakra-ui/react";
import PageTitle from "./PageTitle";
import { contentBackground } from "theme";

export default function PageContainer(props: {
  title: string;
  children?: ReactNode;
  headerChildren?: ReactNode;
}) {
  const { children, headerChildren, title } = props;
  const bgColor = useColorModeValue(
    contentBackground.light,
    contentBackground.dark
  );

  // 앱 이름 가져오기
  const appName = useSelector((state: RootState) => state.system.appName);

  // 페이지 이름 바꾸기
  useEffect(() => {
    title && (document.title = `${title} - ${appName}`);
  });

  return (
    <Flex
      display="flex"
      flexDir="column"
      height="100%"
      overflow="hidden"
      bgColor={bgColor}
    >
      <PageTitle title={title}>{headerChildren}</PageTitle>

      <Box flex="1" overflow="auto">
        {children}
      </Box>
    </Flex>
  );
}
