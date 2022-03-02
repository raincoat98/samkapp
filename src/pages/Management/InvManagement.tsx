import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Management from "components/Management/index";
import { inventorySchema } from "schema/inventory";
import { group2 } from "schema/group2";

export default function InvManagement() {
  const database = useSelector((state: RootState) => state.realm.database);
  const inventoryDataList = database.inventory;
  const partList = database.part;
  const partGroupDataList = database.group2;

  const [stockFilter, setStockFilter] = useState<
    "all" | "in_stock" | "out_of_stock"
  >("all");
  const inStockInventoryDataList = inventoryDataList.filter(
    (invData) => invData.quantity !== 0
  );
  const noStockInventoryDataList = inventoryDataList.filter(
    (invData) => invData.quantity === 0
  );

  const partGroupNameList = partGroupDataList.map(
    (partGroup) => partGroup.group2_name
  );

  const [partGroup, setPartGroup] = useState<group2 | undefined>();

  const [partSpec1DataList, setPartSpec1DataList] = useState<string[]>([]);
  const [partSpec2DataList, setPartSpec2DataList] = useState<string[]>([]);

  const [spec1, setSpec1] = useState<string>();
  const [spec2, setSpec2] = useState<string>();

  return (
    <Management
      title="재고 현황"
      schema={inventorySchema}
      tableProps={{
        data: (stockFilter === "all"
          ? inventoryDataList
          : stockFilter === "in_stock"
          ? inStockInventoryDataList
          : noStockInventoryDataList
        ).filter((inventoryData) => {
          const partData = partList.find(
            (partData) => inventoryData.part_id === partData.part_id
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
          title: "재고",
          data: ["있음", "없음"],
          onFilterChange: (props) => {
            switch (props.index) {
              case 0: {
                setStockFilter("in_stock");
                break;
              }
              case 1: {
                setStockFilter("out_of_stock");
                break;
              }
              default: {
                setStockFilter("all");
                break;
              }
            }
          },
          allowNull: true,
        },
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
