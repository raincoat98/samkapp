import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { customer, customerSchema } from "schema/customer";

export default function CustomerManagement() {
  const collectionName = "customer";
  const database = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );
  const [dataList, setDataList] = useState<customer[]>([...database]);

  const filterNames = [
    "ㄱ",
    "ㄴ",
    "ㄷ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅅ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
    "ABC",
    "#",
  ];

  const filterExprs = [
    /^[ㄱ-ㄲ|ㅏ-ㅣ|가-낗]/,
    /^[ㄴ|ㅏ-ㅣ|ㅏ|나-닣]/,
    /^[ㄷ-ㄸ|ㅏ-ㅣ|다-띻]/,
    /^[ㄹ|ㅏ-ㅣ|라-맇]/,
    /^[ㅁ|ㅏ-ㅣ|마-밓]/,
    /^[ㅂ-ㅃ|ㅏ-ㅣ|바-삫]/,
    /^[ㅅ-ㅆ|ㅏ-ㅣ|사-앃]/,
    /^[ㅇ|ㅏ-ㅣ|아-잏]/,
    /^[ㅈ-ㅉ|ㅏ-ㅣ|자-찧]/,
    /^[ㅊ|ㅏ-ㅣ|차-칳]/,
    /^[ㅋ|ㅏ-ㅣ|카-킿]/,
    /^[ㅌ|ㅏ-ㅣ|타-팋]/,
    /^[ㅍ|ㅏ-ㅣ|파-핗]/,
    /^[ㅎ|ㅏ-ㅣ|하-힣]/,
    /^[a-z|A-Z]/,
    /^(?![ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z])/,
  ];

  return (
    <Management
      title="거래처 관리"
      schema={customerSchema}
      tabProps={{
        tabGroups: [
          {
            allowNull: true,
            data: filterNames,
            onTabChange: (props) => {
              const index = props.index;
              if (index !== undefined && filterExprs[index]) {
                setDataList([
                  ...database.filter((customer) => {
                    return filterExprs[index].test(customer.customer_name);
                  }),
                ]);
              } else {
                setDataList([...database]);
              }
            },
          },
        ],
      }}
      tableProps={{ data: dataList }}
    />
  );
}
