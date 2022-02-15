import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { list_priceSchema } from "schema/list_price";
import { group2 } from "schema/group2";

export default function PartTypeManagement() {
  const partPriceList = useSelector(
    (state: RootState) => state.realm.database.list_price
  );

  const partList = useSelector((state: RootState) => state.realm.database.part);

  const partGroupDataList = useSelector(
    (state: RootState) => state.realm.database.group2
  );

  const partGroupNameList = partGroupDataList.map(
    (partGroup) => partGroup.group2_name
  );

  const [partGroup, setPartGroup] = useState<group2 | undefined>(
    partGroupDataList[0]
  );

  const [partSpec1DataList, setPartSpec1DataList] = useState<string[]>([]);

  const [spec1, setSpec1] = useState<string>();

  return (
    <Management
      title="품목 가격 관리"
      schema={list_priceSchema}
      tableProps={{
        data: partPriceList.filter((partPriceData) => {
          const partData = partList.find(
            (partData) => partPriceData.part_id === partData.part_id
          );

          if (!partData) return false;

          if (partGroup) {
            if (spec1) {
              return (
                partData.group2_id === partGroup.group2_id &&
                partData.spec1 === spec1
              );
            } else {
              return partData.group2_id === partGroup.group2_id;
            }
          } else if (spec1) {
            return partData.spec1 === spec1;
          } else {
            return true;
          }
        }),
      }}
      tabProps={{
        tabGroups: [
          {
            name: "분류",
            data: partGroupNameList,
            onTabChange: (props) => {
              setSpec1(undefined);
              if (props.index !== undefined) {
                const partGroupData = partGroupDataList[props.index];
                setPartGroup(partGroupData);
                const partListGrouped = partList.filter(
                  (partData) => partData.group2_id === partGroupData.group2_id
                );
                const partSpec1List = partListGrouped
                  .map((partData) => partData.spec1 as string)
                  .filter((spec1Data) => spec1Data !== "")
                  .sort();
                const list = Array.from(new Set(partSpec1List));

                setPartSpec1DataList(list);
              } else {
                setPartGroup(undefined);
                setPartSpec1DataList([]);
              }
            },
            allowNull: true,
          },
          {
            name: "스펙 1",
            data: partSpec1DataList,
            onTabChange: (props) => {
              if (props.index !== undefined)
                setSpec1(partSpec1DataList[props.index]);
              else setSpec1(undefined);
            },
            allowNull: true,
          },
        ],
      }}
    />
  );
}
