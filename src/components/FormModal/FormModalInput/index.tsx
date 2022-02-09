import { RootState } from "store";
import { useSelector } from "react-redux";
import moment from "moment";
import { propertyType } from "schema";

import InputFormControl from "components/Input/InputFormControl";
import InputSelect from "components/Input/InputSelect";
import InputEnum from "components/Input/InputEnum";
import InputString from "components/Input/InputString";
import InputNumber from "components/Input/InputNumber";
import InputBool from "components/Input/InputBool";
import InputDate from "components/Input/InputDate";

import InputPartId from "components/Input/InputPartId";

export default function FormModalInput(props: {
  name: string;
  property: propertyType;
  onChange: (value: any) => void;
  defaultValue?: any;
  isDisabled?: boolean;
}) {
  const { property } = props;

  // 데이터베이스
  const database = useSelector((state: RootState) => state.realm.database);
  const propertyType = property.as ?? property.type;
  let element: JSX.Element;

  if (property.foreign) {
    // 외부 테이블 참조
    if (
      property.foreign.table === "part" &&
      property.foreign.key === "part_id"
    ) {
      element = (
        <InputPartId
          defaultValue={props.defaultValue ?? property.default}
          onChange={(value) => props.onChange(value)}
        />
      );
    } else {
      element = (
        <InputEnum
          isDisabled={props.isDisabled}
          enumList={database[property.foreign.table]}
          searchKey={property.foreign.key}
          filter={property.foreign.filter}
          displayKey={property.foreign.display ?? property.foreign.key}
          defaultValue={props.defaultValue ?? property.default}
          onChange={(value) => props.onChange(value)}
        />
      );
    }
  } else if (property.select) {
    // 정해진 값들 중에서 선택
    element = (
      <InputSelect
        selectList={property.select}
        defaultValue={props.defaultValue ?? property.default}
        onChange={(value) => props.onChange(value)}
      />
    );
  } else {
    // 스키마 타입 구분
    switch (propertyType) {
      // 문자열
      case "string": {
        element = (
          <InputString
            onChange={(value) => props.onChange(value)}
            defaultValue={props.defaultValue ?? property.default}
            isTextarea={property.isTextarea}
          />
        );
        break;
      }
      // 숫자
      case "number": {
        element = (
          <InputNumber
            onChange={(value) => props.onChange(value)}
            defaultValue={props.defaultValue ?? property.default}
          />
        );
        break;
      }
      // 날짜 및 월
      case "date":
      case "month": {
        const isMonth = propertyType === "month";
        element = (
          <InputDate
            onChange={(value) => {
              props.onChange(
                property.as
                  ? isMonth
                    ? moment(value).format("YYYY-MM") // 년월
                    : moment(value).format("YYYY-MM-DD") // 년월일
                  : value
              );
            }}
            defaultValue={props.defaultValue ?? property.default}
            isMonth={isMonth}
          />
        );
        break;
      }
      // 불리언 값은 switch 요소로 설정
      case "boolean": {
        element = (
          <InputBool
            isDefaultTrue={props.defaultValue ?? property.default}
            onChange={(checked) => props.onChange(checked)}
          />
        );
        break;
      }
    }
  }

  return (
    <InputFormControl
      name={props.name}
      isRequired={property.isNotNull}
      isDisabled={props.isDisabled}
      isReadOnly={property.isReadOnly}
    >
      {element}
    </InputFormControl>
  );
}
