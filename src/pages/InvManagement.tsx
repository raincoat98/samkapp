import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { invSchema } from "realmObjectModes";

export default function InvManagement() {
  const collectionName = "inv";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="재고 관리"
      schema={invSchema}
      collectionName={collectionName}
      tableProps={{ data }}
    />
  );
}
