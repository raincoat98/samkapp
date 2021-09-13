import React from "react";
import DaumAddressPopup from "components/base/DaumAddressPopup";
import { useDisclosure, Input, Button, Flex } from "@chakra-ui/react";

export type formItem = {
  name: string;
  element?: JSX.Element;
  isDisabled?: boolean;
};

export default function FormModalAddress(props: {
  defaultValue: string;
  onChange: Function;
}) {
  const { defaultValue, onChange } = props;

  const inputEl = React.useRef<HTMLInputElement>(null);

  const addressPopupDisclosure = useDisclosure();

  function onAddressComplete(data: Record<string, any>) {
    if (inputEl.current) inputEl.current.value = data.fullAddress;
    onChange(data.fullAddress);
    addressPopupDisclosure.onClose();
  }

  return (
    <>
      <DaumAddressPopup
        isOpen={addressPopupDisclosure.isOpen}
        onClose={addressPopupDisclosure.onClose}
        isCentered={true}
        onComplete={onAddressComplete}
        children={null}
      />

      <Flex>
        <Input ref={inputEl} defaultValue={defaultValue} type="text" mr={3} />
        <Button
          onClick={() => {
            addressPopupDisclosure.onToggle();
          }}
        >
          주소 검색
        </Button>
      </Flex>
    </>
  );
}
