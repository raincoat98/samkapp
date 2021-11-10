import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { invSchema } from "realmObjectModes";

export default function InvManagement() {
  const collectionName = "tb_inventory";
  const [tabIndex, setTabIndex] = React.useState(0);
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  // 재고가 0인 배열
  const noStockList = data.filter((item) => item.quantity === 0);

  return (
    <Management
      title="재고 관리"
      schema={invSchema}
      collectionName={collectionName}
      tabList={["전체", "재고 없음"]}
      onTabChange={(index: number) => setTabIndex(index)}
      tableProps={{ data: tabIndex === 0 ? data : noStockList }}
    />
  );
}
