import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { COLLECTION_NAME_TYPE } from "schema";
import SearchPopover from "components/SearchPopover";
import { Flex, Select } from "@chakra-ui/react";

export default function FormModalInputExternal(props: {
  collectionName: COLLECTION_NAME_TYPE;
  defaultValue: string;
  onChange: (id: string) => void;
}) {
  const { collectionName, defaultValue, onChange } = props;

  // 데이터베이스
  const dataList = useSelector(
    (state: RootState) => state.realm.database[collectionName]
  );

  // 품목 생산 가능 개수 값
  const maxQty = useSelector((state: RootState) => state.realm.maxMadeQty);

  const refSelect = React.useRef<HTMLSelectElement>(null);

  return (
    <Flex>
      <Select
        placeholder={"없음"}
        defaultValue={defaultValue}
        onChange={(event) => {
          if (event.target.value) onChange(event.target.value);
        }}
        ref={refSelect}
      >
        {/* {dataList.map(
          (data: Record<string, any> & { _id: string | ObjectId }, index) => {
            const id =
              typeof data._id === "string" ? new ObjectId(data._id) : data._id;
            const code: string = data["code"];

            return (
              <option value={id.toHexString()} key={index}>
                {`[${code}]: `}
                {data["name"]}

                {maxQty[code] !== undefined
                  ? ` (생산 가능 수량: ${maxQty[code]})`
                  : ""}
              </option>
            );
          }
        )} */}
      </Select>

      <SearchPopover
        popoverProps={{ placement: "left-start" }}
        data={dataList}
        searchKeys={["code", "name"]}
        onSelect={(fuseResult) => {
          if (refSelect.current) {
            const id = fuseResult.item._id;
            refSelect.current.value = id;
            onChange(id);
          }
        }}
      />
    </Flex>
  );
}
