import React, { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import DrawerComponent from "../../frames/DrawerComponent";
import {
  ButtonGroup,
  Button,
  Stack,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";

export default function CustomerManageDrawer(props: {
  isOpen: boolean;
  onClose: Function;
  onSubmit: Function;
}) {
  const { t } = useTranslation();

  const isCustomer = React.useRef<HTMLInputElement>(null);
  const isVendor = React.useRef<HTMLInputElement>(null);
  const companyName = React.useRef<HTMLInputElement>(null);
  const managerName = React.useRef<HTMLInputElement>(null);
  const contact = React.useRef<HTMLInputElement>(null);
  const fax = React.useRef<HTMLInputElement>(null);
  const address = React.useRef<HTMLInputElement>(null);
  const description = React.useRef<HTMLTextAreaElement>(null);

  return (
    <DrawerComponent
      isOpen={props.isOpen}
      onClose={() => {
        props.onClose();
      }}
      isForm={true}
      headerChildren={<>{t("Add")}</>}
      footerChildren={
        <ButtonGroup spacing={3}>
          <Button
            variant="outline"
            onClick={() => {
              props.onClose();
            }}
          >
            {t("Cancel")}
          </Button>
          <Button type="submit" colorScheme="blue">
            {t("Save")}
          </Button>
        </ButtonGroup>
      }
      onSubmit={(event: FormEvent) => {
        event.preventDefault();
        props.onSubmit({
          isCustomer: isCustomer.current?.checked,
          data: {
            companyName: companyName.current?.value,
            managerName: managerName.current?.value,
            contact: contact.current?.value,
            fax: fax.current?.value,
            address: address.current?.value,
            description: description.current?.value,
          },
        });
      }}
    >
      <Stack spacing={5}>
        <FormControl>
          <RadioGroup defaultValue="customer">
            <Stack direction="row">
              <Radio ref={isCustomer} value="customer">
                {t("Customer")}
              </Radio>
              <Radio ref={isVendor} value="vendor">
                {t("Vendor")}
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl isRequired={true}>
          <FormLabel>{t("Compnany Name")}</FormLabel>
          <Input ref={companyName} />
        </FormControl>

        <FormControl>
          <FormLabel>{t("Manager name")}</FormLabel>
          <Input ref={managerName} />
        </FormControl>

        <FormControl isRequired={true}>
          <FormLabel>{t("Contact")}</FormLabel>
          <Input ref={contact} />
        </FormControl>

        <FormControl>
          <FormLabel>{t("Fax")}</FormLabel>
          <Input ref={fax} />
        </FormControl>

        <FormControl>
          <FormLabel>{t("Address")}</FormLabel>
          <InputGroup>
            <Input ref={address} />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>{t("Description")}</FormLabel>
          <Textarea ref={description} />
        </FormControl>
      </Stack>
    </DrawerComponent>
  );
}
