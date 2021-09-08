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
  const part_group_2Data = useSelector(
    (state: RootState) => state.realm.database["part_group_2"]
  );
  const part_group_1Data = useSelector(
    (state: RootState) => state.realm.database["part_group_1"]
  );

  return (
    <Management
      title="품목 관리"
      schema={partSchema}
      collectionName={collectionName}
      tableData={partData ?? []}
      filterList={[
        { schema: part_group_2Schema, data: part_group_2Data ?? [] },
        { schema: part_group_1Schema, data: part_group_1Data ?? [] },
      ]}
    />
  );
}
