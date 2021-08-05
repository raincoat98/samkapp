import { Box, Flex, HStack } from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["계획", "실적"],
  datasets: [
    {
      data: [100, 3],
      backgroundColor: ["LightSkyBlue", "LightCoral"],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: true,
      text: "진행률",
      position: "bottom",
    },
    legend: {
      display: false,
      position: "top",
    },
  },
};

export default function LineCondition() {
  return (
    <Flex direction="column" width="100%" p="3" height="100%">
      <HStack flex="1">
        <Box>
          <Pie type={"pie"} data={data} options={options} />
        </Box>
        <Box>
          <Pie type={"pie"} data={data} options={options} />
        </Box>
        <Box>
          <Pie type={"pie"} data={data} options={options} />
        </Box>
        <Box>
          <Pie type={"pie"} data={data} options={options} />
        </Box>
      </HStack>
      <HStack flex="1">
        <Box>
          <Pie type={"pie"} data={data} options={options} />
        </Box>
        <Box>
          <Pie type={"pie"} data={data} options={options} />
        </Box>
        <Box>
          <Pie type={"pie"} data={data} options={options} />
        </Box>
        <Box>
          <Pie type={"pie"} data={data} options={options} />
        </Box>
      </HStack>
    </Flex>
  );
}
