import { useSelector } from "react-redux";
import { RootState } from "store";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Center,
  VStack,
  Spinner,
  Text,
} from "@chakra-ui/react";

export default function SpinnerComponent() {
  const progress = useSelector((state: RootState) => state.realm.progress);

  return (
    <Modal
      isOpen={progress !== undefined && progress.isBackgroundWork !== true}
      onClose={() => {}}
      isCentered={true}
    >
      <ModalOverlay />
      <ModalContent
        background="none"
        boxShadow="none"
        cursor="wait"
        userSelect="none"
      >
        <Center>
          <VStack
            padding="5"
            borderRadius={"md"}
            background="whiteAlpha.900"
            color="black"
          >
            <Spinner size="lg" thickness="3px" />
            {progress && <Text fontSize={"lg"}>실행중: {progress.name}</Text>}
          </VStack>
        </Center>
      </ModalContent>
    </Modal>
  );
}
