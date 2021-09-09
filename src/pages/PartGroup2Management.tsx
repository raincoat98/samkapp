import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { part_group_2Schema } from "realmObjectModes";

export default function PartGrou2Management() {
  const collectionName = "part_group_2";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="대분류 관리"
      schema={part_group_2Schema}
      collectionName={collectionName}
      tableData={data ?? []}
    />
  );
}
