import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "../components/Management/index";
import { tb_group2Schema } from "schema/tb_group2";

export default function PartGrou2Management() {
  const collectionName = "tb_group2";
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
      title="대분류 관리"
      schema={tb_group2Schema}
      collectionName={collectionName}
      formModalOptions={{
        group2_id: {
          autofill: {
            value: `GR2_${prefix}${data.length}`,
          },
        },
      }}
      tableProps={{ data }}
    />
  );
}
