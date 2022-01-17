import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { list_priceSchema } from "schema/list_price";

export default function PartTypeManagement() {
  const collectionName = "list_price";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="품목 가격 관리"
      schema={list_priceSchema}
      tableProps={{ data }}
    />
  );
}
