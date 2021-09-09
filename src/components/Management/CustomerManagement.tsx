import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "./index";
import { customerSchema } from "realmObjectModes";

export default function CustomerManagement() {
  const collectionName = "customer";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="고객 관리"
      schema={customerSchema}
      collectionName={collectionName}
      tableData={data ?? []}
    />
  );
}
