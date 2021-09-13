import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { work_orderSchema } from "realmObjectModes";

export default function WorkOrderManagement() {
  const collectionName = "work_order";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="작업 지시 관리"
      schema={work_orderSchema}
      collectionName={collectionName}
      tableData={data ?? []}
    />
  );
}
