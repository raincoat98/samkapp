import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { inventorySchema } from "schema/inventory";

export default function InvManagement() {
  const collectionName = "inventory";
  const [tabIndex, setTabIndex] = React.useState<number | undefined>();
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  // 재고가 0인 배열
  const noStockList = data.filter((item) => item.quantity === 0);

  return (
    <Management
      title="재고 현황"
      schema={inventorySchema}
      tabProps={{
        tab: {
          allowNull: true,
          data: [
            {
              name: "재고 없음",
              isDisabled: !noStockList.length,
            },
          ],
          onTabChange: (props) => setTabIndex(props.index),
        },
      }}
      tableProps={{ data: tabIndex === undefined ? data : noStockList }}
    />
  );
}
