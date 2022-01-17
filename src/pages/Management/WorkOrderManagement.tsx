import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { work_orderSchema } from "schema/work_order";

export default function WorkOrderManagement() {
  const collectionName = "work_order";
  const [tabIndex, setTabIndex] = React.useState(0);

  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  // 진행중 작업지시 목록
  const latestDataList = data.filter((item) => item.status !== 2);

  // 완료된 작업지시 목록
  const oldDataList = data.filter((item) => item.status === 2);

  return (
    <Management
      title="작업지시 현황"
      schema={work_orderSchema}
      tabList={["진행중", "완료"]}
      onTabChange={(index: number) => setTabIndex(index)}
      tableProps={{ data: tabIndex === 0 ? latestDataList : oldDataList }}
    />
  );
}
