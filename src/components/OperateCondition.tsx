import {
  useColorModeValue,
  Box,
  Flex,
  HStack,
  VStack,
  Heading,
  Image,
  Icon,
} from "@chakra-ui/react";
import { BsCircleFill } from "react-icons/bs";

export default function OperateCondition() {
  function MachineLine(props: {
    lineState: [string, string, string, string, string];
  }) {
    const color = useColorModeValue("white", "black");
    const bgStop = useColorModeValue("red.500", "red.200");
    const bgWarning = useColorModeValue("yellow.500", "yellow.200");
    const bgNormal = useColorModeValue("green.500", "green.red");

    return (
      <HStack spacing={5}>
        {props.lineState.map((state, index) => (
          <Flex
            direction="column"
            key={index}
            borderRadius="lg"
            borderWidth={1}
            textAlign="center"
            overflow="hidden"
          >
            <Image
              p={2}
              width="150"
              height="150"
              src="https://image.flaticon.com/icons/png/512/1670/1670470.png"
            ></Image>
            <Box
              fontWeight="bold"
              color={color}
              py={2}
              backgroundColor={
                state === "OK"
                  ? bgNormal
                  : state === "WAIT"
                  ? bgWarning
                  : bgStop
              }
            >
              {state}
            </Box>
          </Flex>
        ))}
      </HStack>
    );
  }

  return (
    <Box>
      <Heading variant="page-title">설비 가동상황</Heading>
      <Flex p={3}>
        <VStack spacing={3} mr={3}>
          <HStack spacing={3} p={3} borderRadius="lg" borderWidth={1}>
            <VStack px={3}>
              <Heading as="h4" size="md">
                BD-A4
              </Heading>
            </VStack>
            <MachineLine
              lineState={["OK", "WAIT", "!", "OK", "OK"]}
            ></MachineLine>
          </HStack>
          <HStack spacing={3} p={3} borderRadius="lg" borderWidth={1}>
            <VStack px={3}>
              <Heading as="h4" size="md">
                BD-A4
              </Heading>
            </VStack>
            <MachineLine
              lineState={["OK", "OK", "OK", "OK", "OK"]}
            ></MachineLine>
          </HStack>
          <HStack spacing={3} p={3} borderRadius="lg" borderWidth={1}>
            <VStack px={3}>
              <Heading as="h4" size="md">
                BD-A4
              </Heading>
            </VStack>
            <MachineLine lineState={["!", "!", "!", "!", "!"]}></MachineLine>
          </HStack>
        </VStack>
        <VStack flex={1} spacing={3} p={3} borderRadius="lg" borderWidth={1}>
          <Heading>범례</Heading>
          <Box>
            <Icon mr={2} color="green" as={BsCircleFill} />
            정상
          </Box>
          <Box>
            <Icon mr={2} color="yellow.500" as={BsCircleFill} />
            경고
          </Box>
          <Box>
            <Icon mr={2} color="red" as={BsCircleFill} />
            정지
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
}
