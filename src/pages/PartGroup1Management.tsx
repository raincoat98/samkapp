import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { part_group_1Schema } from "realmObjectModes";

export default function PartGrou1Management() {
  const collectionName = "tb_group1";
  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  // 인덱스 앞 0 붙이기 (ex 007)
  let prefix = "";
  for (let index = 0; index < 3 - data.length.toString().length; index++) {
    prefix += "0";
  }

  return (
    <Management
      title="중분류 관리"
      schema={part_group_1Schema}
      collectionName={collectionName}
      formModalOptions={{
        group1_id: {
          autofill: {
            value: `GR1_${prefix}${data.length}`,
          },
        },
      }}
      tableProps={{ data }}
    />
  );
}
