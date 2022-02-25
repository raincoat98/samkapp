import { useEffect, useState } from "react";
import { selectType } from "schema";
import { Select } from "@chakra-ui/react";

export default function InputSelect(props: {
  onChange: (value: any) => void;
  selectList: selectType[];
  defaultValue?: any;
}) {
  const [value, setValue] = useState<string>();

  useEffect(() => setValue(props.defaultValue), [props]);

  return (
    <Select
      onChange={(event) => {
        const value =
          event.target.value === "" ? undefined : event.target.value;
        setValue(value);
        props.onChange(value);
      }}
      value={value}
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
