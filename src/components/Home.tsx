import {
  HStack,
  VStack,
  Box,
  Flex,
  Button,
  Badge,
  Grid,
  GridItem,
  Tooltip,
  Divider,
  Heading,
} from "@chakra-ui/react";

import TableFrame from "./TableFrame";
import ChartPieFrame from "./ChartPieFrame";
import ChartLineFrame from "./ChartLineFrame";
import MenuFrame from "./MenuFrame";

function TestBox() {
  return (
    <Box
      align={"center"}
      borderWidth="1px"
      borderRadius="lg"
      overflow={"hidden"}
      flex={1}
    >
      <Box bg={"blue.200"} p={2}>
        생산제품
      </Box>
      <Box p={3}>품명</Box>
    </Box>
  );
}

type GridItemFrameProps = {
  badge: string;
  tooltip: string;
  row: number;
  col: number;
  child: React.ReactNode;
};
function GridItemFrame(props: GridItemFrameProps) {
  return (
    <GridItem
      borderWidth="1px"
      p={3}
      borderRadius="lg"
      rowSpan={props.row}
      colSpan={props.col}
      overflow="auto"
    >
      <Tooltip label={props.tooltip}>
        <Badge position={"absolute"}>{props.badge}</Badge>
      </Tooltip>
      {props.child}
    </GridItem>
  );
}

function Home() {
  return (
    <Flex direction={"column"} height={"100%"} p={3}>
      <HStack p={3} mb={3} spacing={5} borderWidth="1px" borderRadius="lg">
        <VStack>
          <Heading size="lg">장비 1</Heading>
          <MenuFrame
            name="장비 변경"
            items={["모든 장비 보기", "", "장비 1 (현재)", "장비 2"]}
          />
        </VStack>
        <TestBox />
        <TestBox />
        <TestBox />
        <MenuFrame name="작업 변경" items={["작업 A", "작업 B", "작업 C"]} />
        <Button colorScheme="red">작업 종료</Button>
      </HStack>
      <Grid // 6x6 사이즈의 그리드
        flex={1}
        overflow={"hidden"}
        templateRows="repeat(6, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={3}
      >
        <GridItemFrame
          badge="카운터"
          tooltip="현재 카운터 목록입니다."
          col={4}
          row={2}
          child={
            <Flex justify="center" align="center" height="100%">
              <Box
                flex="1"
                borderWidth="1px"
                borderRadius="lg"
                p="3"
                mx="1"
                align="center"
              >
                <Box>카운트</Box>
                <Divider my="1" />
                <Box>1000</Box>
              </Box>
              <Box
                flex="1"
                borderWidth="1px"
                borderRadius="lg"
                p="3"
                mx="1"
                align="center"
              >
                <Box>카운트</Box>
                <Divider my="1" />
                <Box>1000</Box>
              </Box>
              <Box
                flex="1"
                borderWidth="1px"
                borderRadius="lg"
                p="3"
                mx="1"
                align="center"
              >
                <Box>카운트</Box>
                <Divider my="1" />
                <Box>1000</Box>
              </Box>
              <Box
                flex="1"
                borderWidth="1px"
                borderRadius="lg"
                p="3"
                mx="1"
                align="center"
              >
                <Box>카운트</Box>
                <Divider my="1" />
                <Box>1000</Box>
              </Box>
            </Flex>
          }
        />
        <GridItemFrame
          badge="제품양품률"
          tooltip="현재 제품양품률입니다."
          col={2}
          row={2}
          child={<ChartPieFrame />}
        />
        <GridItemFrame
          badge="작업 지시서"
          tooltip="현재 작업 지시서 목록입니다."
          col={4}
          row={4}
          child={<TableFrame />}
        />
        <GridItemFrame
          badge="일간 생산 추이"
          tooltip="현재 일간 생산 추이입니다."
          col={2}
          row={2}
          child={<ChartLineFrame />}
        />
        <GridItemFrame
          badge="주간 생산 추이"
          tooltip="현재 주간 생산 추이입니다."
          col={2}
          row={2}
          child={<ChartLineFrame />}
        />
      </Grid>
    </Flex>
  );
}

export default Home;
