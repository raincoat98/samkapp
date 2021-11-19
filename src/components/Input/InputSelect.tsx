import { selectType } from "schema";
import { Select } from "@chakra-ui/react";

export default function InputSelect(props: {
  onChange: (value: any) => void;
  selectList: selectType[];
  default?: any;
}) {
  return (
    <Select defaultValue={props.default} placeholder="없음">
      {props.selectList.map((selectItem, index) => (
        <option value={selectItem.value} key={index}>
          {selectItem.name ?? selectItem.value}
        </option>
      ))}
    </Select>
  );
}
