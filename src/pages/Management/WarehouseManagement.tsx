import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { warehouseSchema } from "schema/warehouse";

export default function WarehouseManagement() {
  const collectionName = "warehouse";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="창고 관리"
      schema={warehouseSchema}
      tableProps={{ data }}
    />
  );
}
