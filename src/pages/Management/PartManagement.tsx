import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { partSchema } from "schema/part";

export default function PartManagement() {
  const collectionName = "part";
  const [tabIndex, setTabIndex] = React.useState(0);

  const data = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  const partGroupDataList = useSelector(
    (state: RootState) => state.realm.database["group2"]
  );

  const partGroupNameList = partGroupDataList.map(
    (partGroup) => partGroup.group2_name
  );

  function getData() {
    return data.filter(
      (partData) => partData.group2_id === partGroupDataList[tabIndex].group2_id
    );
  }

  return (
    <Management
      title="품목 관리"
      schema={partSchema}
      tableProps={{
        data: (() => {
          return getData();
        })(),
      }}
      tabList={partGroupNameList}
      onTabChange={(index: number) => setTabIndex(index)}
    />
  );
}
