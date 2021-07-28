import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Icon,
  chakra,
} from "@chakra-ui/react";
import faker from "faker";

export default function ClientManage() {
  faker.locale = "ko";

  const upIcon = useSelector((state: RootState) => state.icon.up);
  const downIcon = useSelector((state: RootState) => state.icon.down);

  const data = React.useMemo(
    () =>
      Array(53)
        .fill(undefined)
        .map(() => ({
          companyName: faker.name.firstName() + faker.company.companySuffix(),
          managerName: faker.name.lastName() + faker.name.firstName(),
          contact: faker.phone.phoneNumber(),
          fax: faker.phone.phoneNumber(),
          address: faker.address.state(),
        })),
    []
  );

  const columns = React.useMemo(
    () => [
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
    ],
    []
  );

  const { headerGroups, rows, getTableProps, getTableBodyProps, prepareRow } =
    // @ts-ignore (react-table 라이브러리를 타입스크립트에서 사용시 타입 관련 오류 지우기용 - 실사용엔 지장없음)
    useTable({ columns, data }, useGlobalFilter, useSortBy);

  return (
    <Table {...getTableProps()} wordBreak="break-all">
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                // @ts-ignore
                {...column.getHeaderProps(column.getSortByToggleProps())}
                textAlign="center"
              >
                {(column.isVisible = false)}
                {column.render("Header")}
                <chakra.span pl="2">
                  {/* @ts-ignore */}
                  {column.isSorted ? (
                    // @ts-ignore
                    column.isSortedDesc ? (
                      <Icon as={downIcon} />
                    ) : (
                      <Icon as={upIcon} />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()} textAlign="center">
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
      <TableCaption>목록의 마지막입니다.</TableCaption>
    </Table>
  );
}
