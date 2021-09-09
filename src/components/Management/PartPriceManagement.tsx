import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "./index";
import { part_priceSchema } from "realmObjectModes";

export default function PartTypeManagement() {
  const collectionName = "part_price";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="품목 가격 관리"
      schema={part_priceSchema}
      collectionName={collectionName}
      tableData={data ?? []}
    />
  );
}
