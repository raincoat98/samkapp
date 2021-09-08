import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../index";
import {
  partSchema,
  part_group_2Schema,
  part_group_1Schema,
} from "realmObjectModes";

export default function PartManagement() {
  const collectionName = "part";
  const partData = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="품목 관리"
      schema={partSchema}
      collectionName={collectionName}
      tableData={partData ?? []}
      filterList={[part_group_2Schema, part_group_1Schema]}
    />
  );
}
