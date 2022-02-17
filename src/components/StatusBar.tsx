import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useColorModeValue, HStack, Box, Icon } from "@chakra-ui/react";
import { Detector } from "react-detect-offline";
import { borderColor } from "theme";
import { online, offline } from "utils/icons";

export default function StatusBar() {
  const borderColorValue = useColorModeValue(
    borderColor.light,
    borderColor.dark
  );
  const user = useSelector((state: RootState) => state.realm.user);

  return (
    <HStack
      height="20px"
      padding={1}
      fontSize={"small"}
      borderColor={borderColorValue}
      borderTopWidth={1}
    >
      <Detector
        render={(detect) => <Icon as={detect.online ? online : offline} />}
      />

      {/* 현재 유저 표시 */}
      <Box>현재 유저: {user.name}</Box>
    </HStack>
  );
}
