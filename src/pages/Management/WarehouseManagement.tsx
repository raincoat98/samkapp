import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { tb_warehouseSchema } from "schema/tb_warehouse";

export default function WarehouseManagement() {
  const collectionName = "tb_warehouse";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="창고 관리"
      schema={tb_warehouseSchema}
      tableProps={{ data }}
    />
  );
}
