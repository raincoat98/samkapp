import { selectType } from "schema";
import { Select } from "@chakra-ui/react";

export default function InputSelect(props: {
  onChange: (value: any) => void;
  selectList: selectType[];
  defaultValue?: any;
}) {
  return (
    <Select
      onChange={(event) => {
        const value = event.target.value === "" ? null : event.target.value;
        props.onChange(value);
      }}
      defaultValue={props.defaultValue}
      placeholder="없음"
    >
      {props.selectList.map((selectItem, index) => (
        <option value={selectItem.value} key={index}>
          {selectItem.name ?? selectItem.value}
        </option>
      ))}
    </Select>
  );
}
