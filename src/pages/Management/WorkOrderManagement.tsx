import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { work_orderSchema } from "schema/work_order";
import moment from "moment";

export default function WorkOrderManagement() {
  const collectionName = "work_order";
  const [tabIndex, setTabIndex] = React.useState(0);

  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  // 현재 작업지시 목록
  const latestDataList = data.filter((item) => {
    if (item?.plan_date) {
      return moment(item.plan_date).isSameOrAfter(moment().format("YYYYMMDD"));
    } else return false;
  });

  // 이전 작업지시 목록
  const oldDataList = data.filter((item) => {
    if (item?.plan_date) {
      return moment(item.plan_date).isBefore(moment().format("YYYYMMDD"));
    } else return true;
  });

  return (
    <Management
      title="작업 지시 관리"
      schema={work_orderSchema}
      tabList={["현재", "이전"]}
      onTabChange={(index: number) => setTabIndex(index)}
      tableProps={{ data: tabIndex === 0 ? latestDataList : oldDataList }}
    />
  );
}
