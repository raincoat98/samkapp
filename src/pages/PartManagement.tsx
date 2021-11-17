import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { tb_partSchema } from "schema/tb_part";
import { tb_group2Schema } from "schema/tb_group2";
import { tb_group1Schema } from "schema/tb_group1";

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
      schema={tb_partSchema}
      collectionName={collectionName}
      tableProps={{ data }}
      filterList={[
        { schema: tb_group1Schema, data: part_group_2Data ?? [] },
        { schema: tb_group2Schema, data: part_group_1Data ?? [] },
      ]}
    />
  );
}
