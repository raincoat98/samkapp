import { useTranslation } from "react-i18next";
import { COLLECTION_NAME_TYPE } from "schema";
import { isMonth } from "utils/realmUtils";
import placeholders from "utils/placeholders";
import InputFormControl from "components/Input/InputFormControl";
import InputString from "components/Input/InputString";
import InputNumber from "components/Input/InputNumber";
import InputBool from "components/Input/InputBool";
import InputDate from "components/Input/InputDate";
import InputURL from "../../../Input/InputURL";
import FormModalRefExternal from "./InputExternal";
import {
  Stack,
  Input,
  InputProps,
  Select,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

export default function FormModalInput(props: {
  name: string;
  type: "string" | "number" | "date" | "boolean" | string;
  defaultValue: any;
  labelWidth?: string | number;
  onChange: (value: any) => void;
  isExternal?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isTextarea?: boolean;
  isURL?: boolean; // only string
  enumData?: any[];
}) {
  // 번역
  const { t: translate } = useTranslation();

  const inputProps: InputProps = {
    defaultValue: props.defaultValue,
    onChange: (event) => props.onChange(event.target.value),
    isDisabled: props.isDisabled,
    isReadOnly: props.isReadOnly,
    variant: props.isReadOnly ? "filled" : "outline",
    placeholder: placeholders[props.name] ?? "",
  };

  let element: JSX.Element;

  // 외부 컬렉션 참조일 경우
  if (props.isExternal) {
    element = (
      <FormModalRefExternal
        collectionName={props.type as COLLECTION_NAME_TYPE}
        defaultValue={props.defaultValue?.toString()}
        onChange={(value) => props.onChange(value)}
      />
    );
  } else {
    // enum 사용시 Select 요소 사용
    if (props.enumData && props.enumData.length) {
      // enumData 길이가 3 이하일 경우 Radio 요소 사용, 아닐 경우 Select 요소 사용
      if (props.enumData.length < 4) {
        element = (
          <RadioGroup
            defaultValue={props.defaultValue}
            onChange={(value) => props.onChange(value)}
          >
            <Stack direction="row">
              {props.enumData.map((enumValue, index) => (
                <Radio value={enumValue} key={index}>
                  {translate(`${enumValue}`)}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        );
      } else {
        element = (
          <Select defaultValue={props.defaultValue} placeholder="없음">
            {props.enumData.map((enumValue, index) => (
              <option value={enumValue} key={index}>
                {translate(`${enumValue}`)}
              </option>
            ))}
          </Select>
        );
      }
    } else {
      // 스키마 타입 구분
      switch (props.type) {
        // 문자열
        case "string": {
          // URL
          if (props.isURL) {
            element = (
              <InputURL
                onChange={(value) => props.onChange(value)}
                defaultValue={props.defaultValue}
              />
            );
          } else {
            element = (
              <InputString
                onChange={(value) => props.onChange(value)}
                defaultValue={props.defaultValue}
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
              defaultValue={props.defaultValue}
            />
          );
          break;
        }
        // 날짜
        case "date": {
          element = (
            <InputDate
              onChange={(value) => props.onChange(value)}
              defaultValue={props.defaultValue}
              isMonth={isMonth(props.name)}
            />
          );
          break;
        }
        // 불리언 값은 switch 요소로 설정
        case "boolean": {
          element = (
            <InputBool
              isDefaultTrue={props.defaultValue ? true : false}
              onChange={(checked) => props.onChange(checked)}
            />
          );
          break;
        }
        // 기본값
        default: {
          // Input의 default type은 text
          element = <Input {...inputProps} />;
        }
      }
    }
  }

  return (
    <InputFormControl
      name={props.name}
      labelWidth={props.labelWidth}
      isRequired={props.isRequired}
      isDisabled={props.isDisabled}
      isReadOnly={props.isReadOnly}
    >
      {element}
    </InputFormControl>
  );
}
