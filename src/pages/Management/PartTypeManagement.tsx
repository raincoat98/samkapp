import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { part_typeSchema } from "schema/part_type";

export default function PartTypeManagement() {
  const collectionName = "part_type";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="품목형태"
      schema={part_typeSchema}
      tableProps={{ data }}
    />
  );
}
