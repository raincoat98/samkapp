import { useTranslation } from "react-i18next";
import { FormControl, FormLabel, Box, Tooltip } from "@chakra-ui/react";

export default function InputFormControl(props: {
  name: string;
  labelWidth?: string | number;
  isRequired?: boolean;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  children: React.ReactNode;
}) {
  // 번역
  const { t: translate } = useTranslation();

  // FormLabel width 설정
  const labelWidth =
    props.labelWidth === undefined ? "100px" : props.labelWidth;

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
      <Box flex="1">{props.children}</Box>
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
