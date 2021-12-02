import { Select } from "@chakra-ui/react";

export default function InputEnum(props: {
  enumList: any[];
  searchKey: string;
  displayKey?: string;
  onChange: (selected: any) => void;
  defaultValue?: any;
}) {
  let defaultValueIndex: any;

  for (let index = 0; index < props.enumList.length; index++) {
    if (props.enumList[index][props.searchKey] === props.defaultValue) {
      defaultValueIndex = index;
      break;
    }
  }

  return (
    <Select
      onChange={(event) =>
        props.onChange(
          props.enumList[Number(event.target.value)][props.searchKey]
        )
      }
      defaultValue={defaultValueIndex}
      placeholder="없음"
    >
      {props.enumList.map((enumItem, index) => (
        <option value={index} key={index}>
          {enumItem[props.displayKey ?? props.searchKey]}
        </option>
      ))}
    </Select>
  );
}
