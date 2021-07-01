import React, { useRef } from "react";
import {
  useDisclosure,
  Grid,
  GridItem,
  VStack,
  Box,
  Image,
  Flex,
  IconButton,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import LoginForm from "./LoginForm";

function Main() {
  return (
    <>
      <LoginForm isOpen={true} />
      <Grid
        h={"100%"}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1} bg="white">
          <Flex direction={"column"} p={3} spacing={4} h={"100%"}>
            <Image
              objectFit="contain"
              src="https://1.bp.blogspot.com/-DRdIFx5u7Rk/XVKfn_f43pI/AAAAAAABUDI/53tDXLqaDM4MEihuLeb9RmBeCY5dHBu4QCLcBGAs/s400/building_food_family_restaurant.png"
            />

            <Spacer />

            <VStack flex={1} spacing={4} align="stretch">
              <Button>Button</Button>
              <Button>Button</Button>
              <Button>Button</Button>
              <Button>Button</Button>
              <Button>Button</Button>
              <Button>Button</Button>
            </VStack>

            <Spacer />

            <Box>
              <IconButton aria-label={"설정"} icon={<SettingsIcon />} />
            </Box>
          </Flex>
        </GridItem>
        <GridItem colSpan={2} bg="papayawhip" />
        <GridItem colSpan={2} bg="papayawhip" />
        <GridItem colSpan={4} bg="tomato" />
      </Grid>
    </>
  );
}

export default Main;
