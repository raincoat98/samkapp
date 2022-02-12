import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { transfer_typeSchema } from "schema/transfer_type";

export default function TransferTypeManagement() {
  const collectionName = "transfer_type";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="이동 형태 관리"
      schema={transfer_typeSchema}
      tableProps={{ data }}
    />
  );
}
