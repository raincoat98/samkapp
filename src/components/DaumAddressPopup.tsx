import DaumPostcode from "react-daum-postcode";
import {
  LightMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalProps,
} from "@chakra-ui/react";

export default function PopupPostCode(
  props: ModalProps & {
    onComplete?: (result: {
      data: Record<string, string>;
      fullAddress: string;
      extraAddress: string;
    }) => void;
  }
) {
  const { onComplete, isOpen, onClose, ...rest } = props;

  function handleComplete(data: Record<string, string>) {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    if (onComplete) onComplete({ data, fullAddress, extraAddress });
  }

  return (
    <LightMode>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} {...rest}>
        <ModalOverlay />
        <ModalContent overflow="hidden">
          <ModalHeader
            fontWeight="bold"
            color="black"
            background="#ececec"
            borderBottom="1px solid #e0e0e0"
          >
            주소 검색
          </ModalHeader>
          <ModalCloseButton color="black" />

          <ModalBody p={0}>
            <DaumPostcode onComplete={handleComplete} height="465px" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </LightMode>
  );
}
