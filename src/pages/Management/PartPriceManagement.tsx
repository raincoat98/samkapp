import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { tb_list_priceSchema } from "schema/tb_list_price";

export default function PartTypeManagement() {
  const collectionName = "tb_list_price";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="품목 가격 관리"
      schema={tb_list_priceSchema}
      tableProps={{ data }}
    />
  );
}
