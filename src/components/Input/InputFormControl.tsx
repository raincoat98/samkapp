import { useTranslation } from "react-i18next";
import { FormControl, FormLabel, Box, Tooltip } from "@chakra-ui/react";

export default function InputFormControl(props: {
  name: string;
  isRequired?: boolean; // 필수 여부
  isDisabled?: boolean; // 입력 불가능 (readonly 보다 더 어둡게 표시됨)
  isReadOnly?: boolean; // 수정 불가능
  children: React.ReactNode;
}) {
  // 번역
  const { t: translate } = useTranslation();

  // 폼 박스 생성
  const formControl = (
    <FormControl
      isReadOnly={props.isReadOnly}
      isDisabled={props.isDisabled}
      isRequired={props.isRequired}
      display="flex"
      alignItems="center"
    >
      <FormLabel minWidth={"100px"} marginBottom={0}>
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
