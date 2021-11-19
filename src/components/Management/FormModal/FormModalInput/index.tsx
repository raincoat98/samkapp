import { RootState } from "store";
import { useSelector } from "react-redux";
import { propertyType } from "schema";
import { isMonth } from "utils/realmUtils";
import InputFormControl from "components/Input/InputFormControl";
import InputEnum from "components/Input/InputEnum";
import InputString from "components/Input/InputString";
import InputNumber from "components/Input/InputNumber";
import InputBool from "components/Input/InputBool";
import InputDate from "components/Input/InputDate";
import InputURL from "../../../Input/InputURL";
// import { Stack, Select, RadioGroup, Radio } from "@chakra-ui/react";

export default function FormModalInput(props: {
  name: string;
  property: propertyType;
  labelWidth?: string | number;
  onChange: (value: any) => void;
  isDisabled?: boolean;
  isURL?: boolean; // only string
  isTextarea?: boolean;
}) {
  const { property } = props;

  // 데이터베이스
  const database = useSelector((state: RootState) => state.realm.database);

  let element: JSX.Element;
  if (property.foreign) {
    element = (
      <InputEnum
        enumList={database[property.foreign.table]}
        searchKey={property.foreign.key}
        onChange={(value) => props.onChange(value)}
      />
    );
  } else {
    // enum 사용시 Select 요소 사용
    // if (props.enumData && props.enumData.length) {
    //   // enumData 길이가 3 이하일 경우 Radio 요소 사용, 아닐 경우 Select 요소 사용
    //   if (props.enumData.length < 4) {
    //     element = (
    //       <RadioGroup
    //         defaultValue={property.default}
    //         onChange={(value) => props.onChange(value)}
    //       >
    //         <Stack direction="row">
    //           {props.enumData.map((enumValue, index) => (
    //             <Radio value={enumValue} key={index}>
    //               {translate(`${enumValue}`)}
    //             </Radio>
    //           ))}
    //         </Stack>
    //       </RadioGroup>
    //     );
    //   } else {
    //     element = (
    //       <Select defaultValue={property.default} placeholder="없음">
    //         {props.enumData.map((enumValue, index) => (
    //           <option value={enumValue} key={index}>
    //             {translate(`${enumValue}`)}
    //           </option>
    //         ))}
    //       </Select>
    //     );
    //   }
    // } else {
    // 스키마 타입 구분
    switch (property.type) {
      // 문자열
      case "string": {
        // URL
        if (props.isURL) {
          element = (
            <InputURL
              onChange={(value) => props.onChange(value)}
              defaultValue={property.default}
            />
          );
        } else {
          element = (
            <InputString
              onChange={(value) => props.onChange(value)}
              defaultValue={property.default}
              isTextarea={props.isTextarea}
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
            defaultValue={property.default}
          />
        );
        break;
      }
      // 날짜
      case "date": {
        element = (
          <InputDate
            onChange={(value) => props.onChange(value)}
            defaultValue={property.default}
            isMonth={isMonth(props.name)}
          />
        );
        break;
      }
      // 불리언 값은 switch 요소로 설정
      case "boolean": {
        element = (
          <InputBool
            isDefaultTrue={property.default}
            onChange={(checked) => props.onChange(checked)}
          />
        );
        break;
      }
    }
  }
  // }

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
