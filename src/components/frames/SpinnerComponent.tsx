import {
  Center,
  Spinner,
  SpinnerProps,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

export default function SpinnerComponent(
  props: SpinnerProps & {
    isOpen: boolean;
  }
) {
  const { children, isOpen, ...rest } = props;

  if (isOpen) {
    return (
      <Modal isOpen={isOpen} onClose={() => {}} isCentered={true}>
        <ModalOverlay />
        <ModalContent background="none">
          <Center>
            <Spinner {...rest} />
          </Center>
        </ModalContent>
      </Modal>
    );
  } else {
    return <></>;
  }
}
