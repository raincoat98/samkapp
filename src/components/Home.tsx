import {
  HStack,
  Icon,
  Box,
  Flex,
  Button,
  Badge,
  Grid,
  GridItem,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";

import TableFrame from "./TableFrame";
import ChartPieFrame from "./ChartPieFrame";

function TestBox() {
  return (
    <Box
      align={"center"}
      borderWidth="1px"
      borderRadius="lg"
      overflow={"hidden"}
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
        <Badge>{props.badge}</Badge>
      </Tooltip>
      {props.child}
    </GridItem>
  );
}

function Home() {
  return (
    <Flex direction={"column"} height={"100%"} p={3}>
      <HStack p={3} mb={2.5} spacing={5} borderWidth="1px" borderRadius="lg">
        <TestBox />
        <TestBox />
        <TestBox />
        <Menu>
          <MenuButton as={Button} rightIcon={<Icon as={AiOutlineMenu} />}>
            작업 변경
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
        <Button>작업 종료</Button>
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
          child={<Box />}
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
          child={<Box />}
        />
        <GridItemFrame
          badge="주간 생산 추이"
          tooltip="현재 주간 생산 추이입니다."
          col={2}
          row={2}
          child={<Box />}
        />
      </Grid>
    </Flex>
  );
}

export default Home;
