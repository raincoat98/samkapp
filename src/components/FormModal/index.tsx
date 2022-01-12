import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { schemaType } from "schema";
import { Box, Stack } from "@chakra-ui/react";

// FormModal 관련 컴포넌트 가져오기
import FormModalInput from "./FormModalInput";
import FormModalPopup from "./FormModalPopup";
import FormModalAlert from "./FormModalAlert";

// 타입 선언
export type formItem = {
  name: string;
  element?: JSX.Element;
  isRequired?: boolean;
};
export type formModalModeType = "insert" | "update";

export const FormModalPropsKey = {
  mode: "mode",
  isOpen: "isOpen",
  onClose: "onClose",
  onSave: "onSave",
  initialValue: "initialValue",
  schema: "schema",
} as const;
export type FormModalProps = {
  mode: formModalModeType;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    type: formModalModeType;
    document: Record<string, any>;
    initialValue: Record<string, any>;
  }) => void;
  initialValue: Record<string, any>;
  schema: schemaType;
};
export default function FormModal(props: FormModalProps) {
  // 수정한 데이터가 저장되는 객체
  const [editedDocument, setEditedDocument] = React.useState<
    Record<string, any>
  >({});

  // 필드 값
  const [inputList, setInputList] = React.useState<formItem[]>([]);

  const [isFormModalAlertOpen, setIsFormModalAlertOpen] =
    React.useState<boolean>(false);

  // 데이터베이스
  const database = useSelector((state: RootState) => state.realm.database);

  // initialValue 가 바뀔 때만 기본값 수정
  React.useEffect(() => {
    // 초기화
    setEditedDocument({});
    setInputList([]);

    for (const key in props.schema.properties) {
      // 프로퍼티
      let property = props.schema.properties[key];

      // 직접 추가시에 데이터베이스에서 자동 생성되는 값은 넘어감
      if (props.mode === "insert" && property.isAutoSet) continue;
      // 아예 보여주지 않을 값도 넘어감
      if (property.isNotVisible) continue;

      // 필수값 여부
      const isRequired = property.isNotNull;

      // 비활성화된 값인지 여부
      let disabled = property.isReadOnly as boolean;
      // 기본키는 수정할 수 없으므로 수정 불가능하게
      if (props.mode === "update" && property.isPrimary) disabled = true;

      // 기본값 설정
      let defaultValue = props.initialValue
        ? props.initialValue[key]
        : undefined;

      // 새 데이터를 삽일할 때 autofill에 있는 값을 자동으로 채움
      if (props.mode === "insert" && property.default !== undefined) {
        // 값 지정
        defaultValue = property.default;
        if (property.isReadOnly) disabled = property.isReadOnly;
        setEditedDocument((state) => ({
          ...state,
          [key]: defaultValue,
        }));
      }

      const element = (
        <FormModalInput
          name={`${props.schema.name}.properties.${key}`}
          property={property}
          onChange={(value) => editData({ key, value })}
          defaultValue={defaultValue}
          isDisabled={disabled}
        />
      );

      // 사용자가 직접 수정해야 하거나 봐야하는 값들
      setInputList((state) => [
        ...state,
        {
          name: key,
          element,
          isRequired,
        },
      ]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.initialValue, database]);

  // 데이터 수정시
  function editData(props: { key: string; value: any }) {
    setEditedDocument((state) => ({
      ...state,
      [props.key]: props.value,
    }));
  }

  return (
    // 전체화면 다이얼로그
    <FormModalPopup
      // 다이얼로그 제목
      title={props.mode === "insert" ? "추가" : "수정"}
      // 출력물 데이터
      print={{
        format: props.schema.name,
        data: { ...props.initialValue, ...editedDocument },
      }}
      // 다이얼로그 열림 상태 여부
      isOpen={props.isOpen}
      // 아무것도 수정되지 않았을 때 저장 버튼 비활성화
      isSaveDisabled={Object.keys(editedDocument).length === 0}
      // 다이얼로그가 저장 실행시
      onSubmit={() => {
        props.onSave({
          type: props.mode,
          document: editedDocument,
          initialValue: props.initialValue,
        });
        setEditedDocument({});
      }}
      // 다이얼로그가 닫힐 때
      onClose={() => {
        if (Object.keys(editedDocument).length !== 0) {
          setIsFormModalAlertOpen(true);
        } else {
          setEditedDocument({});
          props.onClose();
        }
      }}
    >
      <FormModalAlert
        isOpen={isFormModalAlertOpen}
        onClose={(isConfirmed) => {
          if (isConfirmed) {
            props.onClose();
            setEditedDocument({});
          }
          setIsFormModalAlertOpen(false);
        }}
      />
      <Stack>
        {inputList.map((formItem, index) => (
          <Box key={index}>{formItem.element}</Box>
        ))}
      </Stack>
    </FormModalPopup>
  );
}
