import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Heading, Box, VStack, Flex, Image } from "@chakra-ui/react";
import HeaderFrame from "./frames/HeaderFrame";
import machineImage from "../images/machine.png";

export default function WorkCondition() {
  const machineList = useSelector((state: RootState) => state.work.machineList);

  return (
    <Box>
      <HeaderFrame title="작업 현황" />
      <VStack m={3}>
        {machineList.map((machine, index) => (
          <Flex
            key={index}
            justify="center"
            align="center"
            width="100%"
            textAlign="center"
            borderWidth="1px"
            borderRadius="lg"
            flexShrink={1}
          >
            <Box flex={1}>
              <Image src={machineImage}></Image>
            </Box>
            <Box flex={1}>{machine.name}</Box>
            <Box flex={1}>{machine.condition}</Box>
            <Box flex={1}>{machine.place}</Box>
            <Box flex={1}>{machine.orderCode}</Box>
            <Box flex={1}>{machine.client}</Box>
            <Box flex={1}>{machine.progress}</Box>
            <Box flex={1}>{machine.estimate}</Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}
