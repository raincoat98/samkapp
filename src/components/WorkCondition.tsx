import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Heading, Box, VStack, Flex } from "@chakra-ui/react";

export default function WorkCondition() {
  const machineList = useSelector((state: RootState) => state.work.machineList);

  return (
    <Box>
      <Heading p={3}>작업 현황</Heading>
      <VStack>
        {machineList.map((machine, index) => (
          <Flex
            key={index}
            justify="center"
            align="center"
            width="100%"
            textAlign="center"
          >
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
