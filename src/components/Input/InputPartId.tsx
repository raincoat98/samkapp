import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { Box, Flex, Select, FormLabel } from "@chakra-ui/react";
import { tb_group2 } from "schema/tb_group2";
import { tb_part } from "schema/tb_part";

export default function InputPartId(props: {
  displayKey?: string;
  onChange: (partId: number) => void;
  defaultValue?: any;
}) {
  // 데이터베이스
  const database = useSelector((state: RootState) => state.realm.database);
  const partList = database.tb_part;
  const group2List = database.tb_group2;

  // 필터된 품목 리스트
  const [filteredPartList1, setFilteredPartList1] = React.useState<tb_part[]>(
    []
  );
  const [filteredPartList2, setFilteredPartList2] = React.useState<tb_part[]>(
    []
  );
  const [filteredPartList3, setFilteredPartList3] = React.useState<tb_part[]>(
    []
  );
  const [filteredPartList4, setFilteredPartList4] = React.useState<tb_part[]>(
    []
  );
  const [filteredPartList5, setFilteredPartList5] = React.useState<tb_part[]>(
    []
  );

  const [group2Item, setGroup2Item] = React.useState<tb_group2>();

  const [partItemId, setPartItemId] = React.useState<number>();
  const [partItemSpec1, setPartItemSpec1] = React.useState<string>();
  const [partItemSpec2, setPartItemSpec2] = React.useState<string>();
  const [partItemSpec3, setPartItemSpec3] = React.useState<string>();
  const [partItemSpec4, setPartItemSpec4] = React.useState<string>();
  const [partItemSpec5, setPartItemSpec5] = React.useState<string>();

  React.useEffect(() => {
    for (let index = 0; index < partList.length; index++) {
      const partItem = partList[index];
      if (partItem.part_id === props.defaultValue) {
        if (partItem.group2_id) {
          setGroup2Item(
            group2List.filter(
              (groupItem) => groupItem.group2_id === partItem.group2_id
            )[0]
          );
        }

        // 필터 적용
        const filtered1 = partList.filter(
          (part) => part.group2_id === partItem.group2_id
        );
        const filtered2 = filtered1.filter(
          (part) => part.spec1 === partItem.spec1
        );
        const filtered3 = filtered2.filter(
          (part) => part.spec2 === partItem.spec2
        );
        const filtered4 = filtered3.filter(
          (part) => part.spec3 === partItem.spec3
        );
        const filtered5 = filtered4.filter(
          (part) => part.spec4 === partItem.spec4
        );

        setFilteredPartList1(filtered1);
        setFilteredPartList2(filtered2);
        setFilteredPartList3(filtered3);
        setFilteredPartList4(filtered4);
        setFilteredPartList5(filtered5);

        setPartItemId(partItem.part_id);
        if (partItem.spec1) setPartItemSpec1(partItem.spec1);
        if (partItem.spec2) setPartItemSpec2(partItem.spec2);
        if (partItem.spec3) setPartItemSpec3(partItem.spec3);
        if (partItem.spec4) setPartItemSpec4(partItem.spec4);
        if (partItem.spec5) setPartItemSpec5(partItem.spec5);
        break;
      }
    }
  }, [group2List, partList, props.defaultValue]);

  React.useEffect(() => {
    if (partItemId !== undefined) props.onChange(partItemId);
  }, [partItemId, props]);

  return (
    <Box>
      <Select
        defaultValue={group2Item?.group2_id}
        value={group2Item?.group2_id}
        placeholder="없음"
        onChange={(event) => {
          const group2Item = group2List.filter((group2Item) => {
            return group2Item.group2_id === Number(event.target.value);
          })[0];
          setGroup2Item(group2Item);

          // 필터 1
          setFilteredPartList1(
            partList.filter((partItem) => {
              return partItem.group2_id === group2Item?.group2_id;
            })
          );
        }}
      >
        {group2List.map((group2Item, index) => (
          <option value={group2Item.group2_id} key={index}>
            {group2Item.group2_name}
          </option>
        ))}
      </Select>

      <Flex>
        {group2Item?.spec1 ? (
          <Box flex="1">
            <FormLabel>{group2Item.spec1}</FormLabel>
            <Select
              defaultValue={partItemSpec1}
              placeholder="없음"
              onChange={(event) => {
                if (event.target.value) {
                  setPartItemSpec1(event.target.value);

                  // 필터 2
                  setFilteredPartList2(
                    filteredPartList1.filter((partItem) => {
                      return partItem.spec1 === event.target.value;
                    })
                  );

                  if (!group2Item?.spec2) {
                    setPartItemId(
                      filteredPartList1.filter(
                        (partItem) => partItem.spec1 === event.target.value
                      )[0].part_id
                    );
                  }
                }
              }}
            >
              {filteredPartList1.map((partItem, index) => (
                <option value={partItem.spec1} key={index}>
                  {partItem.spec1}
                </option>
              ))}
            </Select>
          </Box>
        ) : (
          ""
        )}

        {group2Item?.spec2 ? (
          <Box flex="1">
            <FormLabel>{group2Item.spec2}</FormLabel>
            <Select
              defaultValue={partItemSpec2}
              placeholder="없음"
              onChange={(event) => {
                setPartItemSpec2(event.target.value);

                // 필터 3
                setFilteredPartList3(
                  filteredPartList2.filter((partItem) => {
                    return partItem.spec2 === event.target.value;
                  })
                );

                if (!group2Item?.spec3) {
                  setPartItemId(
                    filteredPartList2.filter(
                      (partItem) => partItem.spec2 === event.target.value
                    )[0].part_id
                  );
                }
              }}
            >
              {filteredPartList2.map((partItem, index) => (
                <option value={partItem.spec2} key={index}>
                  {partItem.spec2}
                </option>
              ))}
            </Select>
          </Box>
        ) : (
          ""
        )}

        {group2Item?.spec3 ? (
          <Box flex="1">
            <FormLabel>{group2Item.spec3}</FormLabel>
            <Select
              defaultValue={partItemSpec3}
              placeholder="없음"
              onChange={(event) => {
                setPartItemSpec3(event.target.value);

                // 필터 4
                setFilteredPartList4(
                  filteredPartList3.filter((partItem) => {
                    return partItem.spec3 === event.target.value;
                  })
                );

                if (!group2Item?.spec4) {
                  setPartItemId(
                    filteredPartList3.filter(
                      (partItem) => partItem.spec3 === event.target.value
                    )[0].part_id
                  );
                }
              }}
            >
              {filteredPartList3.map((partItem, index) => (
                <option value={partItem.spec3} key={index}>
                  {partItem.spec3}
                </option>
              ))}
            </Select>
          </Box>
        ) : (
          ""
        )}

        {group2Item?.spec4 ? (
          <Box flex="1">
            <FormLabel>{group2Item.spec4}</FormLabel>
            <Select
              defaultValue={partItemSpec4}
              placeholder="없음"
              onChange={(event) => {
                setPartItemSpec4(event.target.value);

                // 필터 5
                setFilteredPartList5(
                  filteredPartList4.filter((partItem) => {
                    return partItem.spec4 === event.target.value;
                  })
                );

                if (!group2Item?.spec5) {
                  setPartItemId(
                    filteredPartList4.filter(
                      (partItem) => partItem.spec4 === event.target.value
                    )[0].part_id
                  );
                }
              }}
            >
              {filteredPartList4.map((partItem, index) => (
                <option value={partItem.spec4} key={index}>
                  {partItem.spec4}
                </option>
              ))}
            </Select>
          </Box>
        ) : (
          ""
        )}

        {group2Item?.spec5 ? (
          <Box flex="1">
            <FormLabel>{group2Item.spec5}</FormLabel>
            <Select
              defaultValue={partItemSpec5}
              placeholder="없음"
              onChange={(event) => {
                setPartItemId(
                  filteredPartList5.filter(
                    (partItem) => partItem.spec5 === event.target.value
                  )[0].part_id
                );
              }}
            >
              {filteredPartList5.map((partItem, index) => (
                <option value={partItem.spec5} key={index}>
                  {partItem.spec5}
                </option>
              ))}
            </Select>
          </Box>
        ) : (
          ""
        )}
      </Flex>
    </Box>
  );
}
