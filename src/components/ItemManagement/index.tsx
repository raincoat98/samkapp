import { itemSchema } from "realmObjectModes";
import ManagementComponent from "components/base/ManagementComponent";

export default function ItemManagement() {
  return (
    <ManagementComponent
      title="품목 관리"
      collectionName="item"
      schema={itemSchema}
      useTabs={{
        basicFilterList: [
          {
            name: "전체",
          },
          {
            name: "재고 없음",
            filter: {
              id: "stock",
              value: 0,
            },
          },
        ],
        distinctField: "product_name",
      }}
    />
  );
}
