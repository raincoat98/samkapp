import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { customerSchema } from "realmObjectModes";

export default function CustomerManagement() {
  const collectionName = "tb_customer";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="거래처 관리"
      schema={customerSchema}
      collectionName={collectionName}
      tableProps={{ data }}
    />
  );
}
