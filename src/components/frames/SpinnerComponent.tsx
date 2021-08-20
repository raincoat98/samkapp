import { useSelector } from "react-redux";
import { RootState } from "store";
import {
  Center,
  Spinner,
  SpinnerProps,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

export default function SpinnerComponent(props: SpinnerProps) {
  const { children, ...rest } = props;

  const isProgress = useSelector((state: RootState) => state.system.isProgress);

  return (
    <Modal isOpen={isProgress} onClose={() => {}} isCentered={true}>
      <ModalOverlay />
      <ModalContent background="none" boxShadow="none">
        <Center>
          <Spinner {...rest} />
        </Center>
      </ModalContent>
    </Modal>
  );
}
