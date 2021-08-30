import { productSchema } from "realmObjectModes";
import ManagementComponent from "components/base/ManagementComponent";

export default function ItemManagement() {
  return (
    <ManagementComponent
      title="재고 관리"
      collectionName="product"
      schema={productSchema}
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
