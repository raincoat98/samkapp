import React from "react";
import { useDispatch } from "react-redux";
import { loadAction } from "../store/modules/system";
import { Box, Flex, Center, Image, Progress, Text } from "@chakra-ui/react";

function SpashScreen() {
  let loading = 80;
  const dispatch = useDispatch();

  function systemLoad() {
    dispatch(loadAction());
  }

  return (
    <Flex direction="column" w="100%" h="100vh" onClick={systemLoad}>
      <Progress value={loading} colorScheme="blue" />
      <Center flex={1}>
        <Box>
          <Image src="https://st2.depositphotos.com/1323913/6953/v/600/depositphotos_69535501-stock-illustration-vector-isometric-factory.jpg" />
          <Text align={"center"}>로드 중...</Text>
        </Box>
      </Center>
    </Flex>
  );
}

export default SpashScreen;
