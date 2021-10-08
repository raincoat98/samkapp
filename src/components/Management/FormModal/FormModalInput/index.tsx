import moment from "moment";
import { useTranslation } from "react-i18next";
import { COLLECTION_NAME_TYPE } from "utils/realmUtils";
import placeholders from "utils/placeholders";
import FormModalURLInput from "./InputURL";
import FormModalRefExternal from "./InputExternal";
import {
  FormControl,
  FormLabel,
  Stack,
  Box,
  Input,
  InputProps,
  Textarea,
  TextareaProps,
  Switch,
  SwitchProps,
  Select,
  Tooltip,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

export default function FormModalInput(props: {
  name: string;
  type: "string" | "int" | "date" | "bool" | string;
  defaultValue: any;
  labelWidth?: string | number;
  onChange: Function;
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

  // FormLabel width 설정
  const labelWidth =
    props.labelWidth === undefined ? "100px" : props.labelWidth;

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
        onChange={(value: string) => props.onChange(value)}
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
          // input인지 textarea인지 구분
          if (!props.isTextarea) {
            // URL 텍스트일 경우
            if (props.isURL) {
              element = <FormModalURLInput inputProps={{ ...inputProps }} />;
            } else {
              // 일반 텍스트
              element = <Input type="text" {...inputProps} />;
            }
          } else {
            // textarea (여러줄 입력 가능한 요소)
            const textareaProps = inputProps as TextareaProps;
            element = <Textarea type="text" {...textareaProps} />;
          }
          break;
        }
        // 숫자
        case "int": {
          // Input type="number"
          // valueAsNumber 값은 target.value를 number 타입으로 가져옴
          inputProps.onChange = (event) =>
            props.onChange(event.target.valueAsNumber);
          element = <Input type="number" {...inputProps} />;
          break;
        }
        // 날짜
        case "date": {
          // 기존값이 있을 경우
          if (props.defaultValue) {
            // moment로 input date 포맷에 맞게 수정
            inputProps.defaultValue = moment(props.defaultValue).format(
              "YYYY-MM-DD"
            );
          } else {
            // 오늘 이후 날짜로만 가능하게 설정
            inputProps.min = moment().format("YYYY-MM-DD");
          }

          // valueAsDate 값은 input date 값 포맷을 Date 객체로 가져옴
          inputProps.onChange = (event) =>
            props.onChange(event.target.valueAsDate);

          // Input type="date"
          element = <Input type="date" {...inputProps} />;
          break;
        }
        // 불리언 값은 switch 요소로 설정
        case "bool": {
          const switchProps = inputProps as SwitchProps;

          delete switchProps.defaultValue;
          delete switchProps.variant;

          switchProps.defaultChecked = props.defaultValue ? true : false;
          switchProps.onChange = (event) =>
            props.onChange(event.target.checked);

          // Switch
          element = <Switch {...switchProps} />;
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

  // 폼 박스 생성
  const formControl = (
    <FormControl
      isRequired={props.isRequired}
      display="flex"
      alignItems="center"
    >
      <FormLabel minWidth={labelWidth} marginBottom={0}>
        {translate(`${props.name}`)}
      </FormLabel>
      <Box flex="1">{element}</Box>
    </FormControl>
  );

  // 수정 불가능한 값일 경우 툴팁 추가
  return props.isReadOnly || props.isDisabled ? (
    <Tooltip label="이 값은 수정할 수 없습니다" placement="top">
      {formControl}
    </Tooltip>
  ) : (
    formControl
  );
}
