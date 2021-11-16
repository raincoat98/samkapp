import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { tb_transfer_inSchema } from "realmObjectModes";

export default function TransferInManager() {
  const collectionName = "tb_transfer_in";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="입고 관리"
      schema={tb_transfer_inSchema}
      collectionName={collectionName}
      tableProps={{ data }}
    />
  );
}
