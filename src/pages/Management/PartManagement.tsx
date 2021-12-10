import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { partSchema } from "schema/part";
import { group2Schema } from "schema/group2";

export default function PartManagement() {
  const collectionName = "part";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="품목 관리"
      schema={partSchema}
      tableProps={{ data }}
      filterList={[
        { schema: group2Schema, display: "group2_name", key: "group2_id" },
      ]}
    />
  );
}
