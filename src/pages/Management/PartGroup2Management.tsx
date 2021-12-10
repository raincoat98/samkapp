import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { group2Schema } from "schema/group2";

export default function PartGrou2Management() {
  const collectionName = "group2";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="품목 분류 관리"
      schema={group2Schema}
      tableProps={{ data }}
    />
  );
}
