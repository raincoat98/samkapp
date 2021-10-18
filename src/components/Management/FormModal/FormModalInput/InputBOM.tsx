import React from "react";
import {
  FormControl,
  FormLabel,
  Flex,
  Stack,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import FormModalInput from ".";
import { part_bills_of_material } from "realmObjectModes";
import { plusFill, minusFill } from "utils/icons";
import { ObjectId } from "bson";

export default function FormModalInputBOM(props: {
  defaultValue: part_bills_of_material[];
  onChange: (result: part_bills_of_material[]) => void;
}) {
  const [bomList, setBomList] = React.useState<part_bills_of_material[]>(
    props.defaultValue
  );

  function onDataChange(
    key: "part_id" | "number",
    value: ObjectId | number,
    index: number
  ) {
    const newBomArray = [...bomList];
    const newBom: part_bills_of_material = { ...newBomArray[index] };

    if (newBomArray[index]) {
      switch (key) {
        case "part_id":
          newBom.part_id = value as ObjectId;
          break;
        case "number":
          const num: number = value as number;
          newBom.number = num;
          break;
      }

      newBomArray[index] = newBom;
      setBomList(newBomArray);
      props.onChange(newBomArray);
    }
  }

  // 필요 자재 제거
  function onDataAdd() {
    setBomList((state) => [
      ...state,
      ...[
        {
          part_id: new ObjectId(),
          number: 0,
        },
      ],
    ]);
  }

  // 필요 자재 제거
  function onDataDelete(index: number) {
    const newBomArray = [...bomList];
    newBomArray.splice(index, 1);
    setBomList(newBomArray);
    props.onChange(newBomArray);
  }

  return (
    <FormControl display="flex" alignItems="center">
      <Stack direction="row" minWidth="120px" align="center">
        <FormLabel margin={0}>필요 자재</FormLabel>
        <IconButton
          onClick={() => onDataAdd()}
          icon={<Icon as={plusFill} />}
          colorScheme="blue"
          variant="ghost"
          aria-label="추가"
        />
      </Stack>

      <Flex width="100%">
        <Stack flex="1" direction="column" spacing={3}>
          {bomList.map((bom, index) => (
            <Stack direction="row" key={index}>
              <FormModalInput
                name="part.properties.part_bills_of_material.part_id"
                type="part"
                isExternal={true}
                defaultValue={bom.part_id}
                onChange={(value: ObjectId) =>
                  onDataChange("part_id", value, index)
                }
                labelWidth="auto"
              />
              <FormModalInput
                name="part.properties.part_bills_of_material.number"
                type="int"
                defaultValue={bom.number}
                onChange={(value: number) =>
                  onDataChange("number", value, index)
                }
                labelWidth="auto"
              />

              <IconButton
                onClick={() => onDataDelete(index)}
                icon={<Icon as={minusFill} />}
                colorScheme="red"
                variant="ghost"
                aria-label="제거"
              />
            </Stack>
          ))}
        </Stack>
      </Flex>
    </FormControl>
  );
}
