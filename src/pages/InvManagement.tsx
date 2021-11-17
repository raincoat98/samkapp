import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { tb_inventorySchema } from "schema/tb_inventory";

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
      schema={tb_inventorySchema}
      collectionName={collectionName}
      tabList={["전체", "재고 없음"]}
      onTabChange={(index: number) => setTabIndex(index)}
      tableProps={{ data: tabIndex === 0 ? data : noStockList }}
    />
  );
}
