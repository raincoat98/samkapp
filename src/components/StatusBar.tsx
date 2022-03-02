import { useSelector } from "react-redux";
import { RootState } from "store";
import {
  useColorModeValue,
  HStack,
  Icon,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { Detector } from "react-detect-offline";
import { borderColor } from "theme";
import { online, offline } from "utils/icons";

export default function StatusBar() {
  const borderColorValue = useColorModeValue(
    borderColor.light,
    borderColor.dark
  );
  const user = useSelector((state: RootState) => state.realm.user);
  const progress = useSelector((state: RootState) => state.realm.progress);

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
      <Text>현재 유저: {user.name}</Text>

      {/* 오른쪽 정렬 */}
      <HStack
        flex="1"
        textAlign="right"
        alignItems="center"
        justifyContent="end"
      >
        {/* 백그라운드 작업 표시 */}
        {progress !== undefined && progress.isBackgroundWork && (
          <Spinner
            thickness="3px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xs"
          />
        )}
      </HStack>
    </HStack>
  );
}
