import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { tb_transfer_outSchema } from "schema/tb_transfer_out";

export default function TransferOutManager() {
  const collectionName = "tb_transfer_out";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="출고 관리"
      schema={tb_transfer_outSchema}
      collectionName={collectionName}
      tableProps={{ data }}
    />
  );
}
