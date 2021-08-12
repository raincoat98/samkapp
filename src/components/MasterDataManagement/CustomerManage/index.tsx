import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { useTranslation } from "react-i18next";
import PageContainer from "../../frames/PageContainer";
import TableComponent from "../../frames/TableComponent";
import CustomerManageDialog from "./CustomerManageDialog";
import CustomerManageDrawer from "./CustomerManageDrawer";
import faker from "faker";
import {
  useDisclosure,
  ButtonGroup,
  Button,
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

  // 0 === customerList, 1 === vendorList
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

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

  let customerTableInstance: any;
  const CustomerTable = TableComponent({
    columns: customerColumns,
    data: customerList,
    stateReducer: React.useCallback(
      (newState: any, action: any) => {
        if (customerTableInstance && action.type !== "init") {
          updateSelectedRowIds({
            tableInstance: customerTableInstance,
            newState,
          });
        }
        return newState;
      },
      [customerTableInstance]
    ),
  });
  customerTableInstance = CustomerTable.tableInstance;

  let vendorTableInstance: any;
  const VendorTable = TableComponent({
    columns: vendorColumns,
    data: vendorList,
    stateReducer: React.useCallback(
      (newState: any, action: any) => {
        if (vendorTableInstance && action.type !== "init") {
          updateSelectedRowIds({
            tableInstance: vendorTableInstance,
            newState,
          });
        }
        return newState;
      },
      [vendorTableInstance]
    ),
  });
  vendorTableInstance = VendorTable.tableInstance;

  function updateSelectedRowIds(props: { tableInstance: any; newState: any }) {
    const selectedRows: string[] = [];
    const rows = props.tableInstance.rows;
    for (let i = 0; i < rows.length; i++) {
      for (const key in props.newState.selectedRowIds) {
        if (rows[i].id === key)
          // @ts-ignore
          selectedRows.push(rows[i].original.id);
      }
    }
    selectedRowIds.current = [...selectedRows];
  }

  function deleteCustomerAndVendor() {
    for (let i = 0; i < selectedRowIds.current.length; i++) {
      if (currentTabIndex === 0) {
        dispatch({
          type: "database/deleteCustomer",
          payload: selectedRowIds.current[i],
        });
      } else if (currentTabIndex === 1) {
        dispatch({
          type: "database/deleteVendor",
          payload: selectedRowIds.current[i],
        });
      }
    }
  }

  function addCustomerOrVendor(props: {
    isCustomer?: boolean;
    data: {
      companyName: string;
      managerName: string;
      contact: string;
      fax: string;
      address: string;
      description: string;
    };
  }) {
    dispatch({
      type: "database/" + (props.isCustomer ? "addCustomer" : "addVendor"),
      payload: props.data,
    });
    drawerDisclosure.onClose();
  }

  function makeDummy() {
    for (let index = 0; index < 10; index++) {
      addCustomerOrVendor({
        isCustomer: index < 5 ? true : false,
        data: {
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
  }

  function onTabIndexChange(tabIndex: number) {
    setCurrentTabIndex(tabIndex);

    // @ts-ignore
    if (customerTableInstance) {
      // @ts-ignore
      customerTableInstance.state.selectedRowIds = {};
      selectedRowIds.current.splice(0);
    }
  }

  return (
    <PageContainer
      title={t("Customer Management")}
      headerChildren={
        <ButtonGroup spacing="3">
          <Button variant="outline" onClick={makeDummy}>
            더미 데이터 생성
          </Button>
          <Button
            onClick={dialogDisclosure.onOpen}
            colorScheme="red"
            isDisabled={selectedRowIds.current?.length ? false : true}
          >
            {t("Delete")}
          </Button>
          <Button onClick={drawerDisclosure.onOpen} colorScheme="blue">
            {t("Add")}
          </Button>
        </ButtonGroup>
      }
    >
      <Tabs isFitted onChange={onTabIndexChange}>
        <TabList>
          <Tab>{t("Customer")}</Tab>
          <Tab>{t("Vendor")}</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>{CustomerTable.component}</TabPanel>
          <TabPanel p={0}>{VendorTable.component}</TabPanel>
        </TabPanels>
      </Tabs>

      {/* 추가 폼 */}
      <CustomerManageDrawer
        isOpen={drawerDisclosure.isOpen}
        onClose={drawerDisclosure.onClose}
        onSubmit={addCustomerOrVendor}
      />

      <CustomerManageDialog
        isOpen={dialogDisclosure.isOpen}
        onClose={dialogDisclosure.onClose}
        leastDestructiveRef={undefined}
        headerChildren={"선택한 항목 삭제"}
        footerChildren={
          <ButtonGroup>
            <Button onClick={dialogDisclosure.onClose}>{t("Cancel")}</Button>
            <Button
              colorScheme="red"
              onClick={() => {
                dialogDisclosure.onClose();
                deleteCustomerAndVendor();
              }}
            >
              {t("Delete")}
            </Button>
          </ButtonGroup>
        }
      >
        정말로 삭제하시겠습니까?
      </CustomerManageDialog>
    </PageContainer>
  );
}
