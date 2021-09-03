import Management from "../index";
import { productSchema } from "realmObjectModes";

export default function InventoryManagement() {
  return <Management schema={productSchema} collectionName="product" />;
}
