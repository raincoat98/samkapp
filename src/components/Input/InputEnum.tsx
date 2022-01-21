import { Select } from "@chakra-ui/react";

export default function InputEnum(props: {
  enumList: any[];
  searchKey: string;
  filter?: Record<string, any>;
  displayKey?: string;
  onChange: (selected: any) => void;
  defaultValue?: any;
  sort?: boolean;
}) {
  let dataList = props.enumList;
  let defaultValueIndex: number | undefined;
  const key = props.displayKey ?? props.searchKey;

  // 정렬
  if (props.sort) {
    dataList.sort((a, b) => a[key].toString().localeCompare(b[key].toString()));
  }

  // 특정 값인 데이터만 필터링
  for (const filterKey in props.filter) {
    const filterData = props.filter[filterKey];
    dataList = dataList.filter(
      (enumData) => enumData[filterKey] === filterData
    );
  }

  // 기존값 검색
  if (props.defaultValue) {
    dataList.find((data, index) => {
      if (data[props.searchKey] === props.defaultValue) {
        defaultValueIndex = index;
        return true;
      } else return false;
    });
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
          {enumItem[key]}
        </option>
      ))}
    </Select>
  );
}
