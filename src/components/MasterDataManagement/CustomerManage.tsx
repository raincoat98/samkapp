import React, { FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useTranslation } from "react-i18next";
import PageContainer from "../frames/PageContainer";
import TableComponent, { getTableInstance } from "../frames/TableComponent";
import DrawerComponent from "../frames/DrawerComponent";
import Dialog from "../frames/DialogComponent";
import faker from "faker";
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

  const drawerDisclosure = useDisclosure();
  const dialogDisclosure = useDisclosure();

  const selectedRowIds = React.useRef<string[]>([]);

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

  function deleteCustomer() {
    for (let i = 0; i < selectedRowIds.current.length; i++) {
      dispatch({
        type: "database/deleteCustomer",
        payload: selectedRowIds.current[i],
      });
    }
  }

  function deleteVendor() {
    for (let i = 0; i < selectedRowIds.current.length; i++) {
      dispatch({
        type: "database/deleteVendor",
        payload: selectedRowIds.current[i],
      });
    }
  }

  function addCustomerOrVendor(props: { isCustomer?: boolean }) {
    dispatch({
      type: "database/" + (isCustomer ? "addCustomer" : "addVendor"),
      payload: {
        companyName: companyName.current?.value,
        managerName: managerName.current?.value,
        contact: contact.current?.value,
        fax: fax.current?.value,
        address: address.current?.value,
        description: description.current?.value,
      },
    });
    drawerDisclosure.onClose();
  }

  const stateReducer = React.useCallback(
    (newState: any, action: any) => {
      if (!getTableInstance()) return newState;

      const selectedRows: string[] = [];
      const rows = getTableInstance().rows;
      for (let i = 0; i < rows.length; i++) {
        for (const key in newState.selectedRowIds) {
          if (rows[i].id === key)
            // @ts-ignore
            selectedRows.push(rows[i].original.id);
        }
      }

      selectedRowIds.current = selectedRows;
      return newState;
    },
    [selectedRowIds]
  );

  return (
    <PageContainer
      title={t("Customer Management")}
      headerChildren={
        <ButtonGroup spacing="3">
          <Button
            variant="outline"
            onClick={() => {
              for (let index = 0; index < 10; index++) {
                dispatch({
                  type:
                    "database/" + (isCustomer ? "addCustomer" : "addVendor"),
                  payload: {
                    companyName: faker.company.companyName(),
                    managerName: faker.fake(
                      "{{name.lastName}}, {{name.firstName}} {{name.suffix}}"
                    ),
                    contact: faker.phone.phoneNumber(),
                    fax: faker.phone.phoneNumber(),
                    address: faker.address.streetAddress(),
                    description: faker.lorem.words(),
                  },
                });
              }
            }}
          >
            더미 데이터 생성
          </Button>
          <Button onClick={dialogDisclosure.onOpen} colorScheme="red">
            {t("Delete")}
          </Button>
          <Button onClick={drawerDisclosure.onOpen} colorScheme="blue">
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
              stateReducer={stateReducer}
            />
          </TabPanel>
          <TabPanel p={0}>
            <TableComponent columns={vendorColumns} data={vendorList} />
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* 추가 폼 */}
      <DrawerComponent
        isOpen={drawerDisclosure.isOpen}
        onClose={drawerDisclosure.onClose}
        isForm={true}
        headerChildren={<>{t("Add")}</>}
        footerChildren={
          <ButtonGroup spacing={3}>
            <Button variant="outline" onClick={drawerDisclosure.onClose}>
              {t("Cancel")}
            </Button>
            <Button type="submit" colorScheme="blue">
              {t("Save")}
            </Button>
          </ButtonGroup>
        }
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          addCustomerOrVendor({ isCustomer: isCustomer.current?.checked });
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

      <Dialog
        isOpen={dialogDisclosure.isOpen}
        onClose={dialogDisclosure.onClose}
        leastDestructiveRef={undefined}
        headerChildren={"Delete Customer"}
        footerChildren={
          <ButtonGroup>
            <Button onClick={dialogDisclosure.onClose}>{t("Cancel")}</Button>
            <Button
              colorScheme="red"
              onClick={() => {
                dialogDisclosure.onClose();
                deleteCustomer();
                deleteVendor();
              }}
            >
              {t("Delete")}
            </Button>
          </ButtonGroup>
        }
      >
        Are you sure? You can't undo this action afterwards.
      </Dialog>
    </PageContainer>
  );
}
