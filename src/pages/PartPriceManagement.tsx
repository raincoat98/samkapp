import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { tb_part_list_priceSchema } from "schema/tb_part_list_price";

export default function PartTypeManagement() {
  const collectionName = "tb_part_list_price";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="품목 가격 관리"
      schema={tb_part_list_priceSchema}
      collectionName={collectionName}
      tableProps={{ data }}
    />
  );
}
