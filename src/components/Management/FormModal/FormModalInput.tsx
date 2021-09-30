import moment from "moment";
import { useTranslation } from "react-i18next";
import placeholders from "utils/placeholders";
import FormModalURLInput from "./FormModalURLInput";
import {
  Input,
  InputProps,
  Textarea,
  TextareaProps,
  Switch,
  SwitchProps,
  Tooltip,
  Box,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import FormModalRefExternal from "./FormModalRefExternal";

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
}) {
  let {
    name,
    type,
    defaultValue,
    labelWidth,
    onChange,
    isExternal,
    isRequired,
    isDisabled,
    isReadOnly,
    isTextarea,
    isURL,
  } = props;

  if (labelWidth === undefined) labelWidth = "100px";

  const inputProps: InputProps = {
    defaultValue,
    onChange: (event) => onChange(event.target.value),
    isDisabled,
    isReadOnly,
    variant: isReadOnly ? "filled" : "outline",
    placeholder: placeholders[name] ?? "",
  };

  let element: JSX.Element = <></>;

  const { t: translate } = useTranslation();

  if (isExternal) {
    element = (
      <FormModalRefExternal
        collectionName={type}
        defaultValue={defaultValue?.toString()}
        onChange={(value: string) => onChange(value)}
      />
    );
  } else {
    switch (type) {
      case "string": {
        // 문자열
        if (!isTextarea) {
          if (isURL) {
            element = <FormModalURLInput inputProps={{ ...inputProps }} />;
          } else {
            element = <Input type="text" {...inputProps} />;
          }
        } else {
          const textareaProps: TextareaProps = inputProps as TextareaProps;

          element = <Textarea type="text" {...textareaProps} />;
        }
        break;
      }
      case "int": {
        // 숫자
        element = <Input type="number" {...inputProps} />;
        break;
      }
      case "date": {
        // 날짜
        if (defaultValue) {
          // 기존값이 있을 경우
          inputProps.defaultValue = moment(defaultValue).format("YYYY-MM-DD");
        } else {
          inputProps.min = moment().format("YYYY-MM-DD");
        }

        inputProps.onChange = (event) => onChange(event.target.valueAsDate);

        element = <Input type="date" {...inputProps} />;
        break;
      }
      // 불리언
      case "bool": {
        const switchProps: SwitchProps = inputProps as SwitchProps;

        delete switchProps.defaultValue;
        delete switchProps.variant;

        switchProps.defaultChecked = defaultValue ? true : false;
        switchProps.onChange = (event) => onChange(event.target.checked);

        element = <Switch {...switchProps} />;
        break;
      }
      // 기본값
      default: {
        element = <Input {...inputProps} />;
      }
    }
  }

  const formControl = (
    <FormControl isRequired={isRequired} display="flex" alignItems="center">
      <FormLabel minWidth={labelWidth} marginBottom={0}>
        {translate(`${name}`)}
      </FormLabel>
      <Box flex="1">{element}</Box>
    </FormControl>
  );

  return isReadOnly || isDisabled ? (
    <Tooltip label="이 값은 수정할 수 없습니다" placement="top">
      {formControl}
    </Tooltip>
  ) : (
    formControl
  );
}
