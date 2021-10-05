import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { setCollectionData } from "store/realm";
import { Select } from "@chakra-ui/react";
import { withCodeCollectionList } from "utils/realmUtils";

export default function FormModalInputExternal(props: {
  collectionName: string;
  defaultValue: string;
  onChange: Function;
}) {
  const { collectionName, defaultValue, onChange } = props;

  const dispatch = useDispatch();
  const database = useSelector((state: RootState) => state.realm.database);

  return (
    <Select
      placeholder={"없음"}
      defaultValue={defaultValue}
      onChange={(event) => onChange(event.target.value)}
      onFocus={(event) => {
        if (!database[collectionName])
          dispatch(setCollectionData(collectionName));
      }}
    >
      {database[collectionName]?.map((data: any, index) => (
        <option value={data._id.toString()} key={index}>
          {withCodeCollectionList.includes(collectionName)
            ? `[${data._id.toString()}]: `
            : ""}
          {data[`${collectionName}_name`]}
        </option>
      ))}
    </Select>
  );
}