import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { partSchema } from "schema/part";
import { group2 } from "schema/group2";
import { part_type } from "schema/part_type";

export default function PartManagement() {
  const collectionName = "part";

  const partList = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  const partGroupDataList = useSelector(
    (state: RootState) => state.realm.database.group2
  );

  const partTypeDataList = useSelector(
    (state: RootState) => state.realm.database.part_type
  );

  const partGroupNameList = partGroupDataList.map(
    (partGroup) => partGroup.group2_name
  );

  const partTypeNameList = partTypeDataList.map(
    (partType) => partType.part_type_name ?? partType.part_type_id
  );

  const [partGroup, setPartGroup] = React.useState<group2 | undefined>(
    partGroupDataList[0]
  );
  const [partType, setPartType] = React.useState<part_type>();

  return (
    <Management
      title="품목 관리"
      schema={partSchema}
      tableProps={{
        data: partList.filter((partData) => {
          if (partGroup) {
            if (partType) {
              return (
                partData.group2_id === partGroup.group2_id &&
                partData.part_type_id === partType.part_type_id
              );
            } else {
              return partData.group2_id === partGroup.group2_id;
            }
          } else if (partType) {
            return partData.part_type_id === partType.part_type_id;
          } else {
            return true;
          }
        }),
      }}
      tabProps={{
        tabGroups: [
          {
            data: partGroupNameList,
            defaultValue: 0,
            onTabChange: (props) => {
              if (props.index !== undefined)
                setPartGroup(partGroupDataList[props.index]);
              else setPartGroup(undefined);
            },
            allowNull: true,
          },
          {
            data: partTypeNameList,
            onTabChange: (props) => {
              if (props.index !== undefined)
                setPartType(partTypeDataList[props.index]);
              else setPartType(undefined);
            },
            allowNull: true,
          },
        ],
      }}
    />
  );
}
