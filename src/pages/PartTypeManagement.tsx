import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { tb_part_typeSchema } from "schema/tb_part_type";

export default function PartTypeManagement() {
  const collectionName = "tb_part_type";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="품목형태"
      schema={tb_part_typeSchema}
      collectionName={collectionName}
      tableProps={{ data }}
    />
  );
}
