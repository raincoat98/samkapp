import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { tb_partSchema } from "schema/tb_part";

export default function PartTypeManagement() {
  const collectionName = "tb_part_type";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="품목형태"
      schema={tb_partSchema}
      collectionName={collectionName}
      tableProps={{ data }}
    />
  );
}
