import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { transfer_inSchema } from "schema/transfer_in";

export default function TransferInManager() {
  const collectionName = "transfer_in";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="입고 관리"
      schema={transfer_inSchema}
      tableProps={{ data }}
    />
  );
}
