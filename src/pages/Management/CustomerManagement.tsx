import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { tb_customerSchema } from "schema/tb_customer";

export default function CustomerManagement() {
  const collectionName = "tb_customer";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="거래처 관리"
      schema={tb_customerSchema}
      tableProps={{ data }}
    />
  );
}
