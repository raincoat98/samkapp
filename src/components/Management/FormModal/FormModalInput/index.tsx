import { RootState } from "store";
import { useSelector } from "react-redux";
import { propertyType } from "schema";
import { isMonth } from "utils/realmUtils";

import InputFormControl from "components/Input/InputFormControl";
import InputSelect from "components/Input/InputSelect";
import InputEnum from "components/Input/InputEnum";
import InputString from "components/Input/InputString";
import InputNumber from "components/Input/InputNumber";
import InputBool from "components/Input/InputBool";
import InputDate from "components/Input/InputDate";
import InputURL from "components/Input/InputURL";

export default function FormModalInput(props: {
  name: string;
  property: propertyType;
  onChange: (value: any) => void;
  defaultValue?: any;
  labelWidth?: string | number;
  isDisabled?: boolean;
  isURL?: boolean; // only string
  isTextarea?: boolean;
}) {
  const { property } = props;

  // 데이터베이스
  const database = useSelector((state: RootState) => state.realm.database);

  let element: JSX.Element;

  if (property.foreign) {
    // 외부 테이블 참조
    element = (
      <InputEnum
        enumList={database[property.foreign.table]}
        searchKey={property.foreign.key}
        defaultValue={props.defaultValue ?? property.default}
        onChange={(value) => props.onChange(value)}
      />
    );
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
    switch (property.type) {
      // 문자열
      case "string": {
        // URL
        if (props.isURL) {
          element = (
            <InputURL
              onChange={(value) => props.onChange(value)}
              defaultValue={props.defaultValue ?? property.default}
            />
          );
        } else {
          element = (
            <InputString
              onChange={(value) => props.onChange(value)}
              defaultValue={props.defaultValue ?? property.default}
              isTextarea={props.defaultValue ?? props.isTextarea}
            />
          );
        }
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
      // 날짜
      case "date": {
        element = (
          <InputDate
            onChange={(value) => props.onChange(value)}
            defaultValue={props.defaultValue ?? property.default}
            isMonth={isMonth(props.name)}
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
      labelWidth={props.labelWidth}
      isRequired={property.isNotNull}
      isDisabled={props.isDisabled}
      isReadOnly={property.isReadOnly}
    >
      {element}
    </InputFormControl>
  );
}
