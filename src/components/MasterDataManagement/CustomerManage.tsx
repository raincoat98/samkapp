import React, { FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useTranslation } from "react-i18next";
import PageContainer from "../frames/PageContainer";
import TableComponent from "../frames/TableComponent";
import DrawerComponent from "../frames/DrawerComponent";
import {
  useDisclosure,
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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

export default function CustomerManage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isCustomer = React.useRef<HTMLInputElement>(null);
  const isVendor = React.useRef<HTMLInputElement>(null);
  const companyName = React.useRef<HTMLInputElement>(null);
  const managerName = React.useRef<HTMLInputElement>(null);
  const contact = React.useRef<HTMLInputElement>(null);
  const fax = React.useRef<HTMLInputElement>(null);
  const address = React.useRef<HTMLInputElement>(null);
  const description = React.useRef<HTMLTextAreaElement>(null);

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

  function onCustomerDelete(selectedRowIds: string[]) {
    for (let i = 0; i < selectedRowIds.length; i++) {
      dispatch({
        type: "database/deleteCustomer",
        payload: selectedRowIds[i],
      });
    }
  }

  function onVendorDelete(selectedRowIds: string[]) {
    for (let i = 0; i < selectedRowIds.length; i++) {
      dispatch({
        type: "database/deleteVendor",
        payload: selectedRowIds[i],
      });
    }
  }

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
              <TableComponent
                columns={customerColumns}
                data={customerList}
                onDelete={onCustomerDelete}
              />
            </TabPanel>
            <TabPanel p={0}>
              <TableComponent
                columns={vendorColumns}
                data={vendorList}
                onDelete={onVendorDelete}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </PageContainer>

      {/* 추가 폼 */}
      <DrawerComponent
        isOpen={isOpen}
        onClose={onClose}
        isForm={true}
        headerChildren={<>{t("Add")}</>}
        footerChildren={
          <ButtonGroup>
            <Button variant="outline" mr={3} onClick={onClose}>
              {t("Cancel")}
            </Button>
            <Button type="submit" colorScheme="blue">
              {t("Save")}
            </Button>
          </ButtonGroup>
        }
        onSubmit={(event: FormEvent) => {
          event.preventDefault();

          dispatch({
            type:
              "database/" +
              (isCustomer.current?.checked ? "addCustomer" : "addVendor"),
            payload: {
              companyName: companyName.current?.value,
              managerName: managerName.current?.value,
              contact: contact.current?.value,
              fax: fax.current?.value,
              address: address.current?.value,
              description: description.current?.value,
            },
          });

          onClose();
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
    </>
  );
}
