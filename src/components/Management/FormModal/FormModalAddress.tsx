import React from "react";
import DaumAddressPopup from "components/DaumAddressPopup";
import { useTranslation } from "react-i18next";
import { address } from "realmObjectModes";
import {
  useDisclosure,
  Stack,
  Textarea,
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

export default function FormModalAddress(props: {
  name: string;
  defaultValue: address;
  onChange: Function;
}) {
  const { name, defaultValue, onChange } = props;

  const addressRef = React.useRef<HTMLTextAreaElement>(null);
  const zipCodeRef = React.useRef<HTMLInputElement>(null);

  const addressPopupDisclosure = useDisclosure();
  const { t: translate } = useTranslation();

  function onAddressComplete(result: Record<string, any>) {
    const address = result.fullAddress;
    const zip_code = result.data.zonecode;

    if (addressRef.current) addressRef.current.value = address;
    if (zipCodeRef.current) zipCodeRef.current.value = zip_code;
    onChange({
      address,
      zip_code,
    });
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

      <FormControl display="flex" alignItems="center">
        <FormLabel minWidth="100px" marginBottom={0}>
          {translate(name)}
        </FormLabel>

        <Flex flex="1">
          <Stack flex="1" mr={3}>
            <Input
              ref={zipCodeRef}
              defaultValue={defaultValue.zip_code}
              type="text"
              placeholder="우편번호"
            />
            <Textarea
              ref={addressRef}
              defaultValue={defaultValue.address}
              placeholder="주소"
              rows={2}
            ></Textarea>
          </Stack>

          <Button onClick={() => addressPopupDisclosure.onToggle()}>
            주소 검색
          </Button>
        </Flex>
      </FormControl>
    </>
  );
}
