import React, { FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useTranslation } from "react-i18next";
import PageContainer from "../frames/PageContainer";
import TableComponent from "../frames/TableComponent";
import {
  useDisclosure,
  ButtonGroup,
  Button,
  Stack,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  NumberInput,
  NumberInputField,
  Input,
  InputGroup,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

export default function CustomerManage() {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const customerList = useSelector(
    (state: RootState) => state.database.customer
  );
  const vendorList = useSelector((state: RootState) => state.database.vendor);

  const customerColumns = [
    {
      Header: t("Customer name"),
      accessor: "companyName",
    },
    {
      Header: t("Manager name"),
      accessor: "managerName",
    },
    {
      Header: t("Contact"),
      accessor: "contact",
    },
    {
      Header: t("Fax"),
      accessor: "fax",
    },
    {
      Header: t("Address"),
      accessor: "address",
    },
  ];

  const vendorColumns = [
    {
      Header: t("Vendor name"),
      accessor: "companyName",
    },
    {
      Header: t("Manager name"),
      accessor: "managerName",
    },
    {
      Header: t("Contact"),
      accessor: "contact",
    },
    {
      Header: t("Fax"),
      accessor: "fax",
    },
    {
      Header: t("Address"),
      accessor: "address",
    },
  ];

  return (
    <>
      <PageContainer
        title={t("Customer Management")}
        headerChildren={
          <ButtonGroup spacing="3">
            <Button>{t("Select")}</Button>
            <Button onClick={onOpen} colorScheme="blue">
              {t("Add")}
            </Button>
          </ButtonGroup>
        }
      >
        <Tabs isFitted>
          <TabList>
            <Tab>{t("Customer")}</Tab>
            <Tab>{t("Vendor")}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <TableComponent columns={customerColumns} data={customerList} />
            </TabPanel>
            <TabPanel p={0}>
              <TableComponent columns={vendorColumns} data={vendorList} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PageContainer>
      <CustomerManageDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}

function CustomerManageDrawer(props: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isCustomer = React.useRef<HTMLInputElement>(null);
  const isVendor = React.useRef<HTMLInputElement>(null);
  const companyName = React.useRef<HTMLInputElement>(null);
  const managerName = React.useRef<HTMLInputElement>(null);
  const contact = React.useRef<HTMLInputElement>(null);
  const fax = React.useRef<HTMLInputElement>(null);
  const address = React.useRef<HTMLInputElement>(null);
  const description = React.useRef<HTMLTextAreaElement>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    const companyData = {
      companyName: companyName.current?.value,
      managerName: managerName.current?.value,
      contact: contact.current?.value,
      fax: fax.current?.value,
      address: address.current?.value,
      description: description.current?.value,
    };

    dispatch({
      type:
        "database/" +
        (isCustomer.current?.checked ? "addCustomer" : "addVendor"),
      payload: companyData,
    });

    props.onClose();
  }

  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      size="sm"
      onClose={props.onClose}
    >
      <DrawerOverlay />
      <form onSubmit={onSubmit}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">{t("Add")}</DrawerHeader>
          <DrawerBody>
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
                <InputGroup>
                  <NumberInput inputMode="tel" width="100%">
                    <NumberInputField ref={contact} />
                  </NumberInput>
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>{t("Fax")}</FormLabel>
                <InputGroup>
                  <NumberInput inputMode="tel" width="100%">
                    <NumberInputField ref={fax} />
                  </NumberInput>
                </InputGroup>
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
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={props.onClose}>
              {t("Cancel")}
            </Button>
            <Button type="submit" colorScheme="blue">
              {t("Save")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
}
