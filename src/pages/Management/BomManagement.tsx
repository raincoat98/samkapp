import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { bill_of_materialsSchema } from "schema/bill_of_materials";

export default function BomManagement() {
  const collectionName = "bill_of_materials";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="품목 명세서 관리"
      schema={bill_of_materialsSchema}
      tableProps={{ data }}
    />
  );
}
