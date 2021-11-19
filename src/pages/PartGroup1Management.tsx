import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { tb_group1Schema } from "schema/tb_group1";

export default function PartGrou1Management() {
  const collectionName = "tb_group1";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  return (
    <Management
      title="중분류 관리"
      schema={tb_group1Schema}
      collectionName={collectionName}
      tableProps={{ data }}
    />
  );
}
