import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import moment from "moment";
import Management from "components/Management/index";
import { product_orderSchema } from "schema/product_order";

export default function ProductOrderManager() {
  const collectionName = "product_order";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );
  const [tabIndex, setTabIndex] = useState(0);

  const waitingList = data.filter((item) => !item.status || item.status === 0);

  const dataList = [
    // 대기 및 미분류 작업지시 목록
    {
      name: "대기",
      data: waitingList,
      isDisabled: !waitingList.length,
    },
    // 진행중 작업지시 목록
    {
      name: "진행중",
      data: data.filter((item) => item.status === 1),
      isDisabled: !data.find((item) => item.status === 1),
    },
    // 작업 기간은 지나고, 미완료된 작업지시 목록
    {
      name: "기간 만료",
      data: data.filter(
        (item) => item.status !== 2 && moment(item.due_date).isBefore(moment())
      ),
      isDisabled: !data.find(
        (item) => item.status !== 2 && moment(item.due_date).isBefore(moment())
      ),
    },
    // 완료된 작업지시 목록
    {
      name: "완료",
      data: data.filter((item) => item.status === 2),
      isDisabled: !data.find((item) => item.status === 2),
    },
  ];

  return (
    <Management
      title="생산지시 현황"
      schema={product_orderSchema}
      tabProps={{
        tab: {
          data: dataList.map(({ name, isDisabled }) => {
            return { name, isDisabled: isDisabled };
          }),
          onTabChange: (props) =>
            props.index !== undefined && setTabIndex(props.index),
        },
      }}
      tableProps={{ data: dataList[tabIndex].data }}
    />
  );
}
