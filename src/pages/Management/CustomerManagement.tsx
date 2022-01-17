import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { customerSchema } from "schema/customer";

export default function CustomerManagement() {
  const collectionName = "customer";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="거래처 관리"
      schema={customerSchema}
      tableProps={{ data }}
    />
  );
}
