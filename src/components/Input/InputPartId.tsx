import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { Box, Flex, Select, FormControl, FormLabel } from "@chakra-ui/react";
import { tb_group2 } from "schema/tb_group2";

export default function InputPartId(props: {
  enumList: any[];
  searchKey: string;
  displayKey?: string;
  onChange: (partId: number) => void;
  defaultValue?: any;
}) {
  // 데이터베이스
  const database = useSelector((state: RootState) => state.realm.database);

  const [group2Item, setGroup2Item] = React.useState<tb_group2>();

  const [partItemId, setPartItemId] = React.useState<number>();
  const [partItemSpec1, setPartItemSpec1] = React.useState<string>();
  const [partItemSpec2, setPartItemSpec2] = React.useState<string>();
  const [partItemSpec3, setPartItemSpec3] = React.useState<string>();
  const [partItemSpec4, setPartItemSpec4] = React.useState<string>();

  React.useEffect(() => {
    console.log(partItemId);
    if (partItemId !== undefined) props.onChange(partItemId);
  }, [partItemId, props]);

  return (
    <Box>
      <Select
        placeholder="없음"
        onChange={(event) => {
          const group2Item = database.tb_group2.filter((group2Item) => {
            return group2Item.group2_id === Number(event.target.value);
          })[0];
          setGroup2Item(group2Item);
        }}
      >
        {database.tb_group2.map((group2Item, index) => (
          <option value={group2Item.group2_id} key={index}>
            {group2Item.group2_name}
          </option>
        ))}
      </Select>

      <Flex>
        {group2Item?.spec1 ? (
          <FormControl>
            <FormLabel>{group2Item.spec1}</FormLabel>
            <Select
              placeholder="없음"
              isRequired
              onChange={(event) => {
                if (event.target.value) {
                  setPartItemSpec1(event.target.value);
                  if (!group2Item?.spec2)
                    setPartItemId(
                      database.tb_part.filter(
                        (partItem) =>
                          partItem.group2_id === group2Item?.group2_id &&
                          partItem.spec1 === event.target.value
                      )[0].part_id
                    );
                }
              }}
            >
              {database.tb_part
                .filter(
                  (partItem) => partItem.group2_id === group2Item?.group2_id
                )
                .map((partItem, index) => (
                  <option value={partItem.spec1} key={index}>
                    {partItem.spec1}
                  </option>
                ))}
            </Select>
          </FormControl>
        ) : (
          ""
        )}

        {group2Item?.spec2 ? (
          <FormControl>
            <FormLabel>{group2Item.spec2}</FormLabel>
            <Select
              placeholder="없음"
              onChange={(event) => {
                setPartItemSpec2(event.target.value);
                if (!group2Item?.spec3)
                  setPartItemId(
                    database.tb_part.filter(
                      (partItem) =>
                        partItem.group2_id === group2Item?.group2_id &&
                        partItem.spec1 === partItemSpec1 &&
                        partItem.spec2 === event.target.value
                    )[0].part_id
                  );
              }}
            >
              {database.tb_part
                .filter(
                  (partItem) =>
                    partItem.group2_id === group2Item?.group2_id &&
                    partItem.spec1 === partItemSpec1
                )
                .map((partItem, index) => (
                  <option value={partItem.spec2} key={index}>
                    {partItem.spec2}
                  </option>
                ))}
            </Select>
          </FormControl>
        ) : (
          ""
        )}

        {group2Item?.spec3 ? (
          <FormControl>
            <FormLabel>{group2Item.spec3}</FormLabel>
            <Select
              placeholder="없음"
              onChange={(event) => {
                setPartItemSpec3(event.target.value);
                if (!group2Item?.spec4)
                  setPartItemId(
                    database.tb_part.filter(
                      (partItem) =>
                        partItem.group2_id === group2Item?.group2_id &&
                        partItem.spec1 === partItemSpec1 &&
                        partItem.spec2 === partItemSpec2 &&
                        partItem.spec3 === event.target.value
                    )[0].part_id
                  );
              }}
            >
              {database.tb_part
                .filter(
                  (partItem) =>
                    partItem.group2_id === group2Item?.group2_id &&
                    partItem.spec1 === partItemSpec1 &&
                    partItem.spec2 === partItemSpec2
                )
                .map((partItem, index) => (
                  <option value={partItem.spec3} key={index}>
                    {partItem.spec3}
                  </option>
                ))}
            </Select>
          </FormControl>
        ) : (
          ""
        )}

        {group2Item?.spec4 ? (
          <FormControl>
            <FormLabel>{group2Item.spec4}</FormLabel>
            <Select
              placeholder="없음"
              onChange={(event) => {
                setPartItemSpec4(event.target.value);
                if (!group2Item?.spec5)
                  setPartItemId(
                    database.tb_part.filter(
                      (partItem) =>
                        partItem.group2_id === group2Item?.group2_id &&
                        partItem.spec1 === partItemSpec1 &&
                        partItem.spec2 === partItemSpec2 &&
                        partItem.spec3 === partItemSpec3 &&
                        partItem.spec4 === event.target.value
                    )[0].part_id
                  );
              }}
            >
              {database.tb_part
                .filter(
                  (partItem) =>
                    partItem.group2_id === group2Item?.group2_id &&
                    partItem.spec1 === partItemSpec1 &&
                    partItem.spec2 === partItemSpec2 &&
                    partItem.spec3 === partItemSpec3
                )
                .map((partItem, index) => (
                  <option value={partItem.spec4} key={index}>
                    {partItem.spec4}
                  </option>
                ))}
            </Select>
          </FormControl>
        ) : (
          ""
        )}

        {group2Item?.spec5 ? (
          <FormControl>
            <FormLabel>{group2Item.spec5}</FormLabel>
            <Select
              placeholder="없음"
              onChange={(event) => {
                setPartItemId(
                  database.tb_part.filter(
                    (partItem) =>
                      partItem.group2_id === group2Item?.group2_id &&
                      partItem.spec1 === partItemSpec1 &&
                      partItem.spec2 === partItemSpec2 &&
                      partItem.spec3 === partItemSpec3 &&
                      partItem.spec4 === partItemSpec4 &&
                      partItem.spec5 === event.target.value
                  )[0].part_id
                );
              }}
            >
              {database.tb_part
                .filter(
                  (partItem) =>
                    partItem.group2_id === group2Item?.group2_id &&
                    partItem.spec1 === partItemSpec1 &&
                    partItem.spec2 === partItemSpec2 &&
                    partItem.spec3 === partItemSpec3 &&
                    partItem.spec4 === partItemSpec4
                )
                .map((partItem, index) => (
                  <option value={partItem.spec5} key={index}>
                    {partItem.spec5}
                  </option>
                ))}
            </Select>
          </FormControl>
        ) : (
          ""
        )}
      </Flex>
    </Box>
  );
}
