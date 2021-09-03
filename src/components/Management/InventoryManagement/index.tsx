import Management from "../index";
import { productSchema } from "realmObjectModes";

export default function InventoryManagement() {
  return (
    <Management
      title="재고 관리"
      schema={productSchema}
      collectionName="product"
    />
  );
}
