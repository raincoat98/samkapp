import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { tb_managerSchema } from "schema/tb_manager";

export default function CustomerMngrManagement() {
  const collectionName = "tb_manager";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="거래처 담당자 관리"
      schema={tb_managerSchema}
      collectionName={collectionName}
      tableProps={{ data }}
    />
  );
}
