import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "./index";
import { part_group_1Schema } from "realmObjectModes";

export default function PartGrou1Management() {
  const collectionName = "part_group_1";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="중분류 관리"
      schema={part_group_1Schema}
      collectionName={collectionName}
      tableData={data ?? []}
    />
  );
}
