import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { product_orderSchema } from "schema/product_order";

export default function ProductOrderManager() {
  const collectionName = "product_order";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="생산지시 관리"
      schema={product_orderSchema}
      tableProps={{ data }}
    />
  );
}
