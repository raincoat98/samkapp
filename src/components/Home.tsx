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

import ChartPieFrame from "./frames/ChartPieFrame";
import ChartLineFrame from "./frames/ChartLineFrame";
import MenuFrame from "./frames/MenuFrame";
import { WorkOrderListTable } from "./WorkOrderList";

function Home() {
  return <Flex direction={"column"} height={"100%"} p={3}></Flex>;
}

export default Home;
