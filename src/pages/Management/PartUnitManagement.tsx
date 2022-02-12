import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { unitSchema } from "schema/unit";

export default function PartUnitManagement() {
  const collectionName = "unit";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="품목 단위 관리"
      schema={unitSchema}
      tableProps={{ data }}
    />
  );
}
