import { RootState } from "store";
import { useSelector } from "react-redux";
import { Select } from "@chakra-ui/react";
import { COLLECTION_NAME_TYPE } from "utils/realmUtils";

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
      onChange={(event) => onChange(event.target.value)}
    >
      {database[collectionName].map((data: any, index) => {
        const id = data._id;
        const code = data[`${collectionName}_code`];

        return (
          <option value={id} key={index}>
            {`[${code}]: `}
            {data[`${collectionName}_name`]}
            {maxQty[code] !== undefined
              ? ` (생산 가능 수량: ${maxQty[id]})`
              : ""}
          </option>
        );
      })}
    </Select>
  );
}
