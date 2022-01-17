import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { transfer_outSchema } from "schema/transfer_out";

export default function TransferOutManager() {
  const collectionName = "transfer_out";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="출고 관리"
      schema={transfer_outSchema}
      tableProps={{ data }}
    />
  );
}
