import {
  HStack,
  Box,
  Flex,
  Button,
  Badge,
  Grid,
  GridItem,
  Tooltip,
} from "@chakra-ui/react";

import TableFrame from "./TableFrame";
import ChartPieFrame from "./ChartPieFrame";

function TestBox() {
  return (
    <Box
      align={"center"}
      borderWidth="1px"
      borderRadius="lg"
      bg={"white"}
      overflow={"hidden"}
    >
      <Box bg={"blue.100"} p={2}>
        생산제품
      </Box>
      <Box p={3}>품명</Box>
    </Box>
  );
}

function Home() {
  return (
    <Flex direction={"column"} height={"100%"} p={3}>
      <HStack p={5} mb={2.5} spacing={5} bg={"white"} borderRadius="lg">
        <TestBox />
        <TestBox />
        <TestBox />
        <Button>작업 종료</Button>
      </HStack>
      <Box p={5} flex={1} bg={"white"} borderRadius="lg" overflow={"hidden"}>
        <Grid // 6x6 사이즈의 그리드
          h={"100%"}
          templateRows="repeat(6, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={3}
        >
          <GridItem p={3} borderRadius="lg" colSpan={4} bg="tomato">
            <Tooltip label="현재 카운터 목록입니다.">
              <Badge>카운터</Badge>
            </Tooltip>
          </GridItem>
          <GridItem
            borderWidth="1px"
            p={3}
            borderRadius="lg"
            rowSpan={2}
            colSpan={2}
            bg="papayawhip"
          >
            <Tooltip label="현재 제품양품률입니다.">
              <Badge>제품양품률</Badge>
            </Tooltip>
            <ChartPieFrame/>
          </GridItem>
          <GridItem
            overflow={"auto"}
            p={3}
            borderRadius="lg"
            rowSpan={5}
            colSpan={4}
            bg="papayawhip"
          >
            <Tooltip label="현재 작업 지시서 목록입니다.">
              <Badge>작업 지시서</Badge>
            </Tooltip>
            <TableFrame />
          </GridItem>
          <GridItem p={3} borderRadius="lg" rowSpan={2} colSpan={2} bg="tomato">
            <Tooltip label="현재 일간 생산 추이입니다.">
              <Badge>일간 생산 추이</Badge>
            </Tooltip>
          </GridItem>
          <GridItem p={3} borderRadius="lg" rowSpan={2} colSpan={2} bg="tomato">
            <Tooltip label="현재 주간 생산 추이입니다.">
              <Badge>주간 생산 추이</Badge>
            </Tooltip>
          </GridItem>
        </Grid>
      </Box>
    </Flex>
  );
}

export default Home;
