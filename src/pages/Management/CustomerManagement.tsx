import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { customerSchema } from "schema/customer";

export default function CustomerManagement() {
  const database = useSelector(
    (state: RootState) => state.realm.database.customer
  );
  const [filter, setFilter] = useState<RegExp>();

  const filters = [
    { name: "ㄱ", regex: /^[ㄱ-ㄲ|ㅏ-ㅣ|가-낗]/ },
    { name: "ㄴ", regex: /^[ㄴ|ㅏ-ㅣ|ㅏ|나-닣]/ },
    { name: "ㄷ", regex: /^[ㄷ-ㄸ|ㅏ-ㅣ|다-띻]/ },
    { name: "ㄹ", regex: /^[ㄹ|ㅏ-ㅣ|라-맇]/ },
    { name: "ㅁ", regex: /^[ㅁ|ㅏ-ㅣ|마-밓]/ },
    { name: "ㅂ", regex: /^[ㅂ-ㅃ|ㅏ-ㅣ|바-삫]/ },
    { name: "ㅅ", regex: /^[ㅅ-ㅆ|ㅏ-ㅣ|사-앃]/ },
    { name: "ㅇ", regex: /^[ㅇ|ㅏ-ㅣ|아-잏]/ },
    { name: "ㅈ", regex: /^[ㅈ-ㅉ|ㅏ-ㅣ|자-찧]/ },
    { name: "ㅊ", regex: /^[ㅊ|ㅏ-ㅣ|차-칳]/ },
    { name: "ㅋ", regex: /^[ㅋ|ㅏ-ㅣ|카-킿]/ },
    { name: "ㅌ", regex: /^[ㅌ|ㅏ-ㅣ|타-팋]/ },
    { name: "ㅍ", regex: /^[ㅍ|ㅏ-ㅣ|파-핗]/ },
    { name: "ㅎ", regex: /^[ㅎ|ㅏ-ㅣ|하-힣]/ },
    { name: "ABC", regex: /^[a-z|A-Z]/ },
    { name: "#", regex: /^(?![ㄱ-ㅎ|ㅏ-ㅣ|가-힣|a-z|A-Z])/ },
  ];

  return (
    <Management
      title="거래처 관리"
      schema={customerSchema}
      tabProps={{
        tab: {
          allowNull: true,
          data: filters.map(({ name }) => {
            return { name };
          }),
          onTabChange: (props) => {
            const index = props.index;
            if (index !== undefined && filters[index]) {
              setFilter(filters[index].regex);
            } else {
              setFilter(undefined);
            }
          },
        },
      }}
      tableProps={{
        data: filter
          ? database.filter((customer) => {
              return filter.test(customer.customer_name);
            })
          : database,
      }}
    />
  );
}
