import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../index";
import { productSchema } from "realmObjectModes";

export default function InventoryManagement() {
  const collectionName = "product";
  const productData = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="재고 관리"
      schema={productSchema}
      collectionName={collectionName}
      tableData={productData ?? []}
    />
  );
}
