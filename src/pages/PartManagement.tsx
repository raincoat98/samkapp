import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import {
  partSchema,
  part_group_2Schema,
  part_group_1Schema,
} from "realmObjectModes";

export default function PartManagement() {
  const collectionName = "tb_part";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );
  const part_group_2Data = useSelector(
    (state: RootState) => state.realm.database["tb_group2"]
  );
  const part_group_1Data = useSelector(
    (state: RootState) => state.realm.database["tb_group1"]
  );

  return (
    <Management
      title="품목 관리"
      schema={partSchema}
      collectionName={collectionName}
      tableProps={{ data }}
      filterList={[
        { schema: part_group_2Schema, data: part_group_2Data ?? [] },
        { schema: part_group_1Schema, data: part_group_1Data ?? [] },
      ]}
    />
  );
}
