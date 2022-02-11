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

  const dataList = [
    // 대기 및 미분류 작업지시 목록
    data.filter((item) => !item.status || item.status === 0),
    // 진행중 작업지시 목록
    data.filter((item) => item.status === 1),
    // 완료된 작업지시 목록
    data.filter((item) => item.status === 2),
  ];

  return (
    <Management
      title="작업지시 현황"
      schema={work_orderSchema}
      tabProps={{
        tabGroups: [
          {
            data: ["대기", "진행중", "완료"],
            onTabChange: (props) =>
              props.index !== undefined && setTabIndex(props.index),
          },
        ],
      }}
      tableProps={{ data: dataList[tabIndex] }}
    />
  );
}
