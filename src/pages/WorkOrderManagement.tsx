import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { work_orderSchema } from "realmObjectModes";
import moment from "moment";

export default function WorkOrderManagement() {
  const collectionName = "work_order";
  const [tabIndex, setTabIndex] = React.useState(0);
  const today = moment(Date.now()).format("YYYYMMDD");

  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  // 현재 작업지시 목록
  const latestDataList = data.filter((item) => {
    if (item?.plan_date) {
      return moment(item.plan_date).isSameOrAfter(Date.now());
    } else return false;
  });

  // 이전 작업지시 목록
  const oldDataList = data.filter((item) => {
    if (item?.plan_date) {
      return moment(item.plan_date).isBefore(Date.now());
    } else return true;
  });

  // 오늘 작업지시 인덱스
  const workOrderTodayIndex =
    data.filter((item) => {
      if (item?._id) {
        return item._id.startsWith(moment(Date.now()).format("YYYYMMDD"));
      } else return false;
    }).length + 1;

  // 인덱스 앞 0 붙이기 (ex 007)
  let prefix = "";
  for (
    let index = 0;
    index < 3 - workOrderTodayIndex.toString().length;
    index++
  ) {
    prefix += "0";
  }

  const formModalOptions = {
    _id: {
      autofill: {
        value: `${today}_${prefix}${workOrderTodayIndex}`,
        disabled: true,
      },
    },
    priorities: {
      autofill: {
        value: "normal",
      },
    },
  };

  return (
    <Management
      title="작업 지시 관리"
      schema={work_orderSchema}
      collectionName={collectionName}
      formModalOptions={formModalOptions}
      tabList={["현재", "이전"]}
      onTabChange={(index: number) => setTabIndex(index)}
      tableProps={{ data: tabIndex === 0 ? latestDataList : oldDataList }}
    />
  );
}
