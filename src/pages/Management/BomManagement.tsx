import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { bill_of_materialsSchema } from "schema/bill_of_materials";
import { group2 } from "schema/group2";

export default function BomManagement() {
  const collectionName = "bill_of_materials";
  const bomList = useSelector(
    (state: RootState) => state.realm.database[collectionName]
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
  const [partSpec2DataList, setPartSpec2DataList] = useState<string[]>([]);

  const [spec1, setSpec1] = useState<string>();
  const [spec2, setSpec2] = useState<string>();

  return (
    <Management
      title="품목 명세서 관리"
      schema={bill_of_materialsSchema}
      tableProps={{
        data: bomList.filter((bomData) => {
          const partData = partList.find(
            (partData) => bomData.product_id === partData.part_id
          );

          return partData
            ? (partGroup ? partData.group2_id === partGroup.group2_id : true) &&
                (spec1 ? partData.spec1 === spec1 : true) &&
                (spec2 ? partData.spec2 === spec2 : true)
            : false;
        }),
      }}
      filtersProps={[
        {
          title: "분류",
          data: partGroupNameList,
          onFilterChange: (props) => {
            setSpec1(undefined);
            setSpec2(undefined);
            setPartGroup(undefined);
            setPartSpec1DataList([]);
            setPartSpec2DataList([]);

            if (props.index !== undefined) {
              const partGroupData = partGroupDataList[props.index];
              setPartGroup(partGroupData);
              const partListGrouped = partList.filter(
                (partData) => partData.group2_id === partGroupData.group2_id
              );

              setPartSpec1DataList(
                Array.from(
                  new Set(
                    partListGrouped
                      .map((partData) => partData.spec1 as string)
                      .filter((spec1Data) => spec1Data !== "")
                      .sort()
                  )
                )
              );

              setPartSpec2DataList(
                Array.from(
                  new Set(
                    partListGrouped
                      .map((partData) => partData.spec2 as string)
                      .filter((spec2Data) => spec2Data !== "")
                      .sort()
                  )
                )
              );
            }
          },
          allowNull: true,
        },
        {
          title: "규격 1",
          data: partSpec1DataList,
          onFilterChange: (props) => {
            if (props.index !== undefined) {
              const spec1 = partSpec1DataList[props.index];
              setSpec1(partSpec1DataList[props.index]);

              const filteredPartList = partList.filter(
                (partData) => partData.spec1 === spec1
              );

              setPartSpec2DataList(
                Array.from(
                  new Set(
                    filteredPartList
                      .map((partData) => partData.spec2 as string)
                      .filter((spec2Data) => spec2Data !== "")
                      .sort()
                  )
                )
              );
            } else setSpec1(undefined);
          },
          allowNull: true,
        },
        {
          title: "규격 2",
          data: partSpec2DataList,
          onFilterChange: (props) => {
            if (props.index !== undefined)
              setSpec2(partSpec2DataList[props.index]);
            else setSpec2(undefined);
          },
          allowNull: true,
        },
      ]}
    />
  );
}
