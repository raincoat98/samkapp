import { Select } from "@chakra-ui/react";

export default function InputEnum(props: {
  enumList: any[];
  searchKey: string;
  filter?: Record<string, any>;
  displayKey?: string;
  onChange: (selected: any) => void;
  defaultValue?: any;
}) {
  let dataList = [...props.enumList];
  let defaultValueIndex: any;

  for (let index = 0; index < dataList.length; index++) {
    // 기본값 적용
    if (dataList[index][props.searchKey] === props.defaultValue) {
      defaultValueIndex = index;
      break;
    }

    // 특정 값인 데이터만 필터링
    for (const filterKey in props.filter) {
      const filterData = props.filter[filterKey];
      dataList = dataList.filter(
        (enumData) => enumData[filterKey] === filterData
      );
    }
  }

  return (
    <Select
      onChange={(event) =>
        props.onChange(dataList[Number(event.target.value)][props.searchKey])
      }
      defaultValue={defaultValueIndex}
      placeholder="없음"
    >
      {dataList.map((enumItem, index) => (
        <option value={index} key={index}>
          {enumItem[props.displayKey ?? props.searchKey]}
        </option>
      ))}
    </Select>
  );
}
