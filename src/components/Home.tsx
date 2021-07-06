import { VStack, Box } from "@chakra-ui/react";
import FactoryCard from "./FactoryCard";

function Home() {
  return (
    <Box flex={1} overflow={"auto"}>
      <VStack spacing="24px" p={10}>
        <FactoryCard />
        <FactoryCard />
        <FactoryCard />
      </VStack>
    </Box>
  );
}

export default Home;
