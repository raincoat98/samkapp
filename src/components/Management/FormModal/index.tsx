import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import {
  sortData,
  schemaType,
  readonlySchemaKeyList,
  disabledSchemaKeyList,
  textAreaSchemaKeyList,
} from "utils/realmUtils";
import { Box, Stack } from "@chakra-ui/react";

// FormModal 관련 컴포넌트 가져오기
import FormModalInput from "./FormModalInput";
import FormModalAddress from "./FormModalInput/InputAddress";
import FormModalBillsOfMaterial from "./FormModalInput/InputBOM";
import FormModalInfo, { FormModalInfoData } from "./FormModalInfo";
import FormModalPopup from "./FormModalPopup";

// 타입 선언
export type formItem = {
  name: string;
  element?: JSX.Element;
  isRequired?: boolean;
};
export type formModalModeType = "insert" | "update";
export type autofillType = { value: any; disabled?: boolean };

export const FormModalPropsKey = {
  mode: "mode",
  isOpen: "isOpen",
  onClose: "onClose",
  onSave: "onSave",
  initialValue: "initialValue",
  schema: "schema",
  options: "options",
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
  options?: Record<
    string,
    {
      autofill?: { value: any; disabled?: boolean };
    }
  >;
};
export default function FormModal(props: FormModalProps) {
  // 수정한 데이터가 저장되는 객체
  const [editedDocument, setEditedDocument] = React.useState<
    Record<string, any>
  >({});

  // 필드 값
  const [inputList, setInputList] = React.useState<formItem[]>([]);
  // 수정 불가능 값
  const [disabledDataList, setDisabledDataList] = React.useState<
    FormModalInfoData[]
  >([]);

  // 데이터베이스
  const database = useSelector((state: RootState) => state.realm.database);

  // initialValue 가 바뀔 때만 기본값 수정
  React.useEffect(() => {
    // 초기화
    setEditedDocument({});
    setInputList([]);
    setDisabledDataList([]);

    for (const key in props.schema.properties) {
      // 유저가 수정 못하는 값일 경우 다음으로
      if (
        props.schema.primaryKey === key ||
        !!disabledSchemaKeyList.filter((disabledKey) => disabledKey === key)
          .length
      )
        continue;

      // 프로퍼티 타입
      let type = props.schema.properties[key];

      // 배열 여부
      let isArray = type.endsWith("[]");
      if (isArray) type = type.replaceAll("[]", "");

      // 필수값 여부
      let isRequired = type.endsWith("?") ? false : true;
      if (!isRequired) type = type.replaceAll("?", "");

      // 읽기 전용 값인지 판단
      let isReadonly = !!readonlySchemaKeyList.filter(
        (readonlyKey) => readonlyKey === key
      ).length;

      // 비활성화된 값인지 여부
      let disabled = false;

      // 기본값 설정
      let defaultValue = props.initialValue
        ? props.initialValue[key]
        : undefined;

      // 새 데이터를 삽일할 때 autofill에 있는 값을 자동으로 채움
      if (props.mode === "insert") {
        for (const optionKey in props.options) {
          if (key === optionKey) {
            const option = props.options[optionKey];
            if (option.autofill) {
              const autofillData = option.autofill;
              // 값 지정
              defaultValue = autofillData.value;
              // disabled가 true 일 경우 수정불가능하게 함
              disabled = autofillData.disabled ?? false;
              setEditedDocument((state) => ({
                ...state,
                [optionKey]: autofillData.value,
              }));
            }
          }
        }
      }

      let element: JSX.Element;

      if (!isReadonly) {
        switch (type) {
          // 문자열, 숫자, 날짜, 불리언
          case "string":
          case "int":
          case "date":
          case "bool": {
            // enum 설정
            let enumData: any[] | undefined = undefined;
            switch (key) {
              // 작업 지시 우선순위
              case "priorities":
                enumData = ["emergency", "normal", "other"];
                break;
              // 작업 지시 진행상황
              case "progress":
                enumData = ["confirmed", "shipped", "producing", "done"];
                break;
            }

            element = (
              <FormModalInput
                name={`${props.schema.name}.properties.${key}`}
                type={type}
                defaultValue={defaultValue}
                onChange={(value: any) => editData({ key, value })}
                isTextarea={textAreaSchemaKeyList.includes(key)}
                isRequired={isRequired}
                isReadOnly={
                  props.mode === "update" && key === props.schema.primaryKey
                }
                isDisabled={disabled}
                isURL={key.includes("homepage") || key.includes("url")}
                enumData={enumData}
              />
            );

            break;
          }
          // 배열, 객체, objectId (유니크한 아이디 값, UUID 비슷한 객체)
          case "array":
          case "object":
          case "objectId": {
            console.log("처리되지 않은", key, type);
            continue;
          }
          // BOM (필요자재)
          case "part_bills_of_material": {
            isRequired = false;
            element = (
              <FormModalBillsOfMaterial
                defaultValue={defaultValue ?? []}
                onChange={(value: any) => editData({ key, value })}
              />
            );
            break;
          }
          // 주소
          case "address": {
            isRequired = false;
            element = (
              <FormModalAddress
                name={`${props.schema.name}.properties.${key}`}
                defaultValue={defaultValue ?? {}}
                onChange={(result) => editData({ key, value: result })}
              />
            );
            break;
          }
          // 외부 테이블 및 스키마 처리
          default: {
            isRequired = false;
            element = (
              <FormModalInput
                name={`${props.schema.name}.properties.${key}`}
                type={type}
                defaultValue={defaultValue}
                onChange={(value: any) => editData({ key, value })}
                isExternal={true}
                isRequired={isRequired}
              />
            );
            break;
          }
        }

        // 사용자가 직접 수정해야 하거나 봐야하는 값들
        setInputList((state) => [
          ...state,
          {
            name: key,
            element,
            isRequired,
          },
        ]);
      } else {
        // 사용자가 수정할 때 보여질 필요 없는 값들
        setDisabledDataList((state) => [
          ...state,
          {
            key,
            type,
            value: defaultValue,
          },
        ]);
      }
    }

    // 정렬
    setInputList((state) =>
      state.sort((formItem1, formItem2) => {
        let a = 99,
          b = 99;

        // 필수 필드라면 먼저 맨 앞으로
        if (formItem1.isRequired) a = -1;
        if (formItem2.isRequired) b = -1;

        // 정렬 데이터 참조
        const schemaSort = sortData[props.schema.name];
        if (schemaSort) {
          if (typeof schemaSort[formItem1.name] === "number")
            a = schemaSort[formItem1.name];
          if (typeof schemaSort[formItem2.name] === "number")
            b = schemaSort[formItem2.name];
        }

        try {
          return a - b;
        } catch (error) {
          console.error(error);
          return 0;
        }
      })
    );

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
      }}
      // 다이얼로그가 닫힐 때
      onClose={() => {
        setEditedDocument({});
        props.onClose();
      }}
      // 정보 값(생성날짜, 수정자 등)은 수정 모드일 때만 추가
      info={
        props.mode === "update" ? (
          <FormModalInfo dataList={disabledDataList} />
        ) : (
          ""
        )
      }
    >
      <Stack>
        {inputList.map((formItem, index) => (
          <Box key={index}>{formItem.element}</Box>
        ))}
      </Stack>
    </FormModalPopup>
  );
}
