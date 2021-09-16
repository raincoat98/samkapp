import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { customer_mngrSchema } from "realmObjectModes";

export default function CustomerMngrManagement() {
  const collectionName = "customer_mngr";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="거래처 담당자 관리"
      schema={customer_mngrSchema}
      collectionName={collectionName}
      tableData={data ?? []}
    />
  );
}
