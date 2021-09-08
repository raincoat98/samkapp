import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../index";
import { locSchema } from "realmObjectModes";

export default function LocationManagement() {
  const collectionName = "loc";
  const locData = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="위치 관리"
      schema={locSchema}
      collectionName={collectionName}
      tableData={locData ?? []}
    />
  );
}
