import faker from "faker";
import TableComponent from "./frames/TableComponent";

export default function ToolManage() {
  faker.locale = "ko";

  const data = Array(53)
    .fill(undefined)
    .map(() => ({
      companyName: faker.name.firstName() + faker.company.companySuffix(),
      managerName: faker.name.lastName() + faker.name.firstName(),
      contact: faker.phone.phoneNumber(),
      fax: faker.phone.phoneNumber(),
      address: faker.address.state(),
    }));

  const columns = [
    {
      Header: "목형 이름",
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

  return <TableComponent columns={columns} data={data} />;
}
