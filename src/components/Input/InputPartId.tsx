import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import {
  useMediaQuery,
  Box,
  Flex,
  Select,
  FormControl,
  FormLabel,
  Stack,
  Divider,
  Center,
} from "@chakra-ui/react";
import { group2 } from "schema/group2";
import { part } from "schema/part";

export default function InputPartId(props: {
  onChange: (partId?: number) => void;
  defaultValue?: any;
}) {
  // 가로 세로 모드 구분
  const [isLandscape] = useMediaQuery("(orientation: landscape)");

  // 데이터베이스
  const database = useSelector((state: RootState) => state.realm.database);
  const partList = database.part;
  const group2List = database.group2;
  const invList = database.inventory;
  const warehousetList = database.warehouse;

  // 품목 분류 리스트
  const [sameGroupPartList, setSameGroupPartList] = React.useState<part[]>([]);

  // 필터된 품목 리스트
  const [partListFiltedBySpec1, setPartListFiltedBySpec1] = React.useState<
    part[]
  >([]);
  const [partListFiltedBySpec2, setPartListFiltedBySpec2] = React.useState<
    part[]
  >([]);
  const [partListFiltedBySpec3, setPartListFiltedBySpec3] = React.useState<
    part[]
  >([]);
  const [partListFiltedBySpec4, setPartListFiltedBySpec4] = React.useState<
    part[]
  >([]);

  const [group2Item, setGroup2Item] = React.useState<group2>();

  const [partItemId, setPartItemId] = React.useState<part["part_id"]>();
  const [partItemSpec1, setPartItemSpec1] = React.useState<part["spec1"]>("");
  const [partItemSpec2, setPartItemSpec2] = React.useState<part["spec2"]>("");
  const [partItemSpec3, setPartItemSpec3] = React.useState<part["spec3"]>("");
  const [partItemSpec4, setPartItemSpec4] = React.useState<part["spec4"]>("");
  const [partItemSpec5, setPartItemSpec5] = React.useState<part["spec5"]>("");
  const setPartItemSpec = [
    undefined,
    setPartItemSpec1,
    setPartItemSpec2,
    setPartItemSpec3,
    setPartItemSpec4,
    setPartItemSpec5,
  ] as const;

  React.useEffect(() => {
    for (let index = 0; index < partList.length; index++) {
      const partItem = partList[index];
      if (partItem.part_id === props.defaultValue) {
        if (partItem.group2_id) {
          setGroup2Item(
            group2List.find(
              (groupItem) => groupItem.group2_id === partItem.group2_id
            )
          );
        }

        // 필터 적용
        // 같은 분류의 품목들로 필터링
        const _sameGroupPartList = partList.filter(
          (part) => part.group2_id === partItem.group2_id
        );
        setSameGroupPartList(_sameGroupPartList);

        const filtered2 = _sameGroupPartList.filter(
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

        setPartListFiltedBySpec1(filtered2);
        setPartListFiltedBySpec2(filtered3);
        setPartListFiltedBySpec3(filtered4);
        setPartListFiltedBySpec4(filtered5);

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
    setPartItemId(
      sameGroupPartList.find(
        (partItem) =>
          partItem.spec1 === partItemSpec1 &&
          partItem.spec2 === partItemSpec2 &&
          partItem.spec3 === partItemSpec3 &&
          partItem.spec4 === partItemSpec4 &&
          partItem.spec5 === partItemSpec5
      )?.part_id
    );
  }, [
    sameGroupPartList,
    partItemSpec1,
    partItemSpec2,
    partItemSpec3,
    partItemSpec4,
    partItemSpec5,
  ]);

  function setSpec(spec: 1 | 2 | 3 | 4 | 5, value?: part["spec1"]) {
    for (let index = spec; index < 5; index++) {
      setPartItemSpec[index]("");
    }
    setPartItemSpec[spec](value);

    let spec1 = spec === 1 ? value : partItemSpec1,
      spec2 = spec === 2 ? value : partItemSpec2,
      spec3 = spec === 3 ? value : partItemSpec3,
      spec4 = spec === 4 ? value : partItemSpec4,
      spec5 = spec === 5 ? value : partItemSpec5;

    const partId = sameGroupPartList.find(
      (partItem) =>
        partItem.spec1 === spec1 &&
        partItem.spec2 === spec2 &&
        partItem.spec3 === spec3 &&
        partItem.spec4 === spec4 &&
        partItem.spec5 === spec5
    )?.part_id;

    setPartItemId(partId);
    props.onChange(partId);
  }

  return (
    <Box>
      <FormControl isRequired={true}>
        <Select
          value={group2Item?.group2_id}
          placeholder="없음"
          onChange={(event) => {
            const group2Item = group2List.find(
              (group2Item) =>
                group2Item.group2_id === Number(event.target.value)
            );
            setGroup2Item(group2Item);

            // 필터 1
            setSameGroupPartList(
              partList.filter(
                (partItem) => partItem.group2_id === group2Item?.group2_id
              )
            );
          }}
        >
          {group2List.map((group2Item, index) => (
            <option value={group2Item.group2_id} key={index}>
              {group2Item.group2_name}
            </option>
          ))}
        </Select>

        {group2Item && (
          <Flex
            flexDir={isLandscape ? "row" : "column"}
            marginTop={2}
            paddingLeft={2}
          >
            {/* 해당 분류에 품목이 존재하지 않을 때 */}
            {sameGroupPartList.length === 0 && (
              <Select placeholder="해당 분류의 품목이 존재하지 않습니다. 먼저 품목을 추가해주세요."></Select>
            )}

            {/* 스펙은 없고 품명만 있는 것이 있음 */}
            {sameGroupPartList.length !== 0 && !group2Item?.spec1 && (
              <Box flex="1">
                <FormLabel>품명</FormLabel>
                <Select
                  value={partItemId?.toString()}
                  placeholder="없음"
                  onChange={(event) => {
                    if (event.target.value !== "") {
                      setPartItemId(Number(event.target.value));
                    }
                  }}
                >
                  {sameGroupPartList.map((part, index) => {
                    return (
                      <option value={part.part_id} key={index}>
                        {part.part_name}
                      </option>
                    );
                  })}
                </Select>
              </Box>
            )}

            <Center marginRight={2}>
              <Divider orientation="vertical" />
            </Center>

            <Stack flex="1" direction={isLandscape ? "row" : "column"}>
              {sameGroupPartList.length !== 0 && (
                <>
                  {group2Item?.spec1 && (
                    <Box flex="1">
                      <FormLabel>{group2Item.spec1}</FormLabel>
                      <Select
                        value={partItemSpec1}
                        placeholder="없음"
                        onChange={(event) => {
                          setSpec(1, event.target.value);

                          setPartListFiltedBySpec1(
                            sameGroupPartList.filter(
                              (partItem) =>
                                partItem.spec1 === event.target.value
                            )
                          );
                        }}
                      >
                        {createSelectOptions(sameGroupPartList, "spec1")}
                      </Select>
                    </Box>
                  )}

                  {group2Item?.spec2 && (
                    <Box flex="1">
                      <FormLabel>{group2Item.spec2}</FormLabel>
                      <Select
                        value={partItemSpec2}
                        placeholder="없음"
                        onChange={(event) => {
                          setSpec(2, event.target.value);

                          setPartListFiltedBySpec2(
                            partListFiltedBySpec1.filter(
                              (partItem) =>
                                partItem.spec2 === event.target.value
                            )
                          );
                        }}
                      >
                        {createSelectOptions(partListFiltedBySpec1, "spec2")}
                      </Select>
                    </Box>
                  )}

                  {group2Item?.spec3 && (
                    <Box flex="1">
                      <FormLabel>{group2Item.spec3}</FormLabel>
                      <Select
                        value={partItemSpec3}
                        placeholder="없음"
                        onChange={(event) => {
                          setSpec(3, event.target.value);

                          setPartListFiltedBySpec3(
                            partListFiltedBySpec2.filter(
                              (partItem) =>
                                partItem.spec3 === event.target.value
                            )
                          );
                        }}
                      >
                        {createSelectOptions(partListFiltedBySpec2, "spec3")}
                      </Select>
                    </Box>
                  )}

                  {group2Item?.spec4 && (
                    <Box flex="1">
                      <FormLabel>{group2Item.spec4}</FormLabel>
                      <Select
                        value={partItemSpec4}
                        placeholder="없음"
                        onChange={(event) => {
                          setSpec(4, event.target.value);

                          setPartListFiltedBySpec4(
                            partListFiltedBySpec3.filter(
                              (partItem) =>
                                partItem.spec4 === event.target.value
                            )
                          );
                        }}
                      >
                        {createSelectOptions(partListFiltedBySpec3, "spec4")}
                      </Select>
                    </Box>
                  )}

                  {group2Item?.spec5 && (
                    <Box flex="1">
                      <FormLabel>{group2Item.spec5}</FormLabel>
                      <Select
                        value={partItemSpec5}
                        placeholder="없음"
                        onChange={(event) => {
                          setSpec(5, event.target.value);
                        }}
                      >
                        {createSelectOptions(partListFiltedBySpec4, "spec5")}
                      </Select>
                    </Box>
                  )}
                </>
              )}
            </Stack>
          </Flex>
        )}

        {
          <Box marginTop={1} marginLeft={2}>
            {invList.map((invData, index) => {
              if (invData.part_id === partItemId) {
                const warehouse = warehousetList.find(
                  (warehoustData) =>
                    warehoustData.warehouse_id === invData.warehouse_id
                );

                return (
                  <Box key={index}>
                    {`${warehouse?.warehouse_name}: ${invData.quantity}`}
                  </Box>
                );
              } else return "";
            })}
          </Box>
        }
      </FormControl>
    </Box>
  );
}

function createSelectOptions(
  partList: part[],
  key: "spec1" | "spec2" | "spec3" | "spec4" | "spec5"
) {
  return Array.from(
    new Set(
      partList.filter((part) => !isNil(part[key])).map((part) => part[key])
    )
  )
    .sort()
    .map((spec, index) => {
      return (
        <option value={spec} key={index}>
          {spec}
        </option>
      );
    });
}

function isNil(spec?: string) {
  return spec === null || spec === undefined || spec === "";
}
