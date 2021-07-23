import {
  useColorMode,
  Box,
  Flex,
  HStack,
  VStack,
  Heading,
  Badge,
  Tag,
  Image,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { BsCircleFill } from "react-icons/bs";

function Home() {
  function MachineLine(props: {
    lineState: [string, string, string, string, string];
  }) {
    const { colorMode } = useColorMode();
    const lightColor = {
      green: "green.500",
      yellow: "yellow.500",
      red: "red.500",
    };
    const darkColor = {
      green: "green.300",
      yellow: "yellow.300",
      red: "red.300",
    };
    const color = colorMode === "light" ? lightColor : darkColor;
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
              color={colorMode === "light" ? "white" : "black"}
              py={2}
              backgroundColor={
                state === "OK"
                  ? color.green
                  : state === "WAIT"
                  ? color.yellow
                  : color.red
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

export default Home;
