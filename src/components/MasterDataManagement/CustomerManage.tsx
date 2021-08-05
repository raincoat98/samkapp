import faker from "faker";
import TableComponent from "../frames/TableComponent";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export default function CustomerManage() {
  faker.locale = "ko";

  const clientData = Array(30)
    .fill(undefined)
    .map(() => ({
      companyName: faker.name.firstName() + faker.company.companySuffix(),
      managerName: faker.name.lastName() + faker.name.firstName(),
      contact: faker.phone.phoneNumber(),
      fax: faker.phone.phoneNumber(),
      address: faker.address.state(),
    }));

  const retailerData = Array(30)
    .fill(undefined)
    .map(() => ({
      companyName: faker.name.firstName() + faker.company.companySuffix(),
      managerName: faker.name.lastName() + faker.name.firstName(),
      contact: faker.phone.phoneNumber(),
      fax: faker.phone.phoneNumber(),
      address: faker.address.state(),
    }));

  const clientColumns = [
    {
      Header: "거래처명",
      accessor: "companyName",
    },
    {
      Header: "담당자명",
      accessor: "managerName",
    },
    {
      Header: "연락처",
      accessor: "contact",
    },
    {
      Header: "팩스",
      accessor: "fax",
    },
    {
      Header: "주소",
      accessor: "address",
    },
  ];

  const retailerColumns = [
    {
      Header: "판매처명",
      accessor: "companyName",
    },
    {
      Header: "담당자명",
      accessor: "managerName",
    },
    {
      Header: "연락처",
      accessor: "contact",
    },
    {
      Header: "팩스",
      accessor: "fax",
    },
    {
      Header: "주소",
      accessor: "address",
    },
  ];

  return (
    <Tabs isFitted>
      <TabList>
        <Tab>거래처</Tab>
        <Tab>판매처</Tab>
      </TabList>

      <TabPanels>
        <TabPanel p={0}>
          <TableComponent columns={clientColumns} data={clientData} />
        </TabPanel>
        <TabPanel p={0}>
          <TableComponent columns={retailerColumns} data={retailerData} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
