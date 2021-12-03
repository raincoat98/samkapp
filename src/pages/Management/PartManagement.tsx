import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { tb_partSchema } from "schema/tb_part";
import { tb_group2Schema } from "schema/tb_group2";

export default function PartManagement() {
  const collectionName = "tb_part";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="품목 관리"
      schema={tb_partSchema}
      tableProps={{ data }}
      filterList={[
        { schema: tb_group2Schema, display: "group2_name", key: "group2_id" },
      ]}
    />
  );
}
