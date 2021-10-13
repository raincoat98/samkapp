import { RootState } from "store";
import { useSelector } from "react-redux";
import { Select } from "@chakra-ui/react";
import { COLLECTION_NAME_TYPE } from "utils/realmUtils";
import { ObjectId } from "bson";

export default function FormModalInputExternal(props: {
  collectionName: COLLECTION_NAME_TYPE;
  defaultValue: string;
  onChange: Function;
}) {
  const { collectionName, defaultValue, onChange } = props;

  // 데이터베이스
  const database = useSelector((state: RootState) => state.realm.database);

  // 품목 생산 가능 개수 값
  const maxQty = useSelector((state: RootState) => state.realm.maxMadeQty);

  return (
    <Select
      placeholder={"없음"}
      defaultValue={defaultValue}
      onChange={(event) => {
        if (event.target.value) onChange(new ObjectId(event.target.value));
      }}
    >
      {database[collectionName].map(
        (data: Record<string, any> & { _id: string | ObjectId }, index) => {
          const id =
            typeof data._id === "string" ? new ObjectId(data._id) : data._id;
          const code: string = data[`${collectionName}_code`];

          return (
            <option value={id.toHexString()} key={index}>
              {`[${code}]: `}
              {data[`${collectionName}_name`]}

              {/* 생산 가능 수량 표시 */}
              {maxQty[code] !== undefined
                ? ` (생산 가능 수량: ${maxQty[code]})`
                : ""}
            </option>
          );
        }
      )}
    </Select>
  );
}
