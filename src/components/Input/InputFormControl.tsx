import { useTranslation } from "react-i18next";
import { useMediaQuery, FormControl, FormLabel, Box } from "@chakra-ui/react";

export default function InputFormControl(props: {
  name: string;
  isRequired?: boolean; // 필수 여부
  isDisabled?: boolean; // 입력 불가능 (readonly 보다 더 어둡게 표시됨)
  isReadOnly?: boolean; // 수정 불가능
  children: React.ReactNode;
}) {
  // 번역
  const { t: translate } = useTranslation();

  // 화면 방향
  const [isLandscape] = useMediaQuery("(orientation: landscape)");

  // 폼 박스 생성
  const formControl = (
    <FormControl
      isReadOnly={props.isReadOnly}
      isDisabled={props.isDisabled}
      isRequired={props.isRequired}
      display="flex"
      flexDirection={isLandscape ? "row" : "column"}
      alignItems={isLandscape ? "center" : "normal"}
      // 수정 불가능한 값일 경우 툴팁 추가
      title={
        props.isReadOnly || props.isDisabled
          ? "이 값은 변경할 수 없습니다."
          : "변경하려면 클릭해주세요."
      }
    >
      <FormLabel minWidth={"100px"} marginBottom={0}>
        {translate(`${props.name}`)}
      </FormLabel>
      <Box flex="1">{props.children}</Box>
    </FormControl>
  );

  return formControl;
}
