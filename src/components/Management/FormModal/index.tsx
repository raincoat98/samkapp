import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import {
  schemaType,
  readonlySchemaKeyList,
  disabledSchemaKeyList,
  textAreaSchemaKeyList,
} from "utils/realmUtils";
import FormModalInput from "./FormModalInput";
import FormModalWorkOrderPriorities from "./FormModalWorkOrderPriorities";
import FormModalAddress from "./FormModalAddress";
import FormModalInfo, { FormModalInfoData } from "./FormModalInfo";
import FormModalPopup from "./FormModalPopup";
import sortData from "data/sortData";
import { Box, Stack, ModalProps } from "@chakra-ui/react";

export type formItem = {
  name: string;
  element?: JSX.Element;
  isRequired?: boolean;
};

export default function FormModal(
  props: ModalProps & {
    initialValue: Record<string, any>;
    schema: schemaType;
    mode: "insert" | "update" | string;
    onChange: Function;
  }
) {
  const [editedDocument, setEditedDocument] = React.useState<
    Record<string, any>
  >({});
  const { onChange, initialValue, schema, mode } = props;

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

    for (const key in schema.properties) {
      // 유저가 수정 못하는 값일 경우 다음으로
      if (
        !!disabledSchemaKeyList.filter((disabledKey) => disabledKey === key)
          .length
      )
        continue;

      let type = schema.properties[key];
      let defaultValue = initialValue ? initialValue[key] : undefined;
      let element: JSX.Element;

      // ? 로 끝나는 것은 필수값이 아님
      let isRequired = type.endsWith("?") ? false : true;
      if (type.endsWith("?")) {
        type = type.replaceAll("?", "");
      }

      // 읽기 전용 값인지 판단
      const isReadonly = !!readonlySchemaKeyList.filter(
        (readonlyKey) => readonlyKey === key
      ).length;

      if (!isReadonly) {
        switch (type) {
          case "string":
          case "int":
          case "date":
          case "bool": {
            switch (key) {
              // 작업 지시 우선순위
              case "priorities": {
                element = (
                  <FormModalWorkOrderPriorities
                    defaultValue={defaultValue}
                    onChange={(value: any) => editData({ key, value })}
                  />
                );
                break;
              }
              default: {
                element = (
                  <FormModalInput
                    name={`${schema.name}.properties.${key}`}
                    type={type}
                    defaultValue={defaultValue}
                    onChange={(value: any) => editData({ key, value })}
                    isTextarea={textAreaSchemaKeyList.includes(key)}
                    isRequired={isRequired}
                    isReadOnly={mode === "update" && key === schema.primaryKey}
                    isURL={key.includes("homepage") || key.includes("url")}
                  />
                );
              }
            }
            break;
          }
          case "array":
          case "object":
          case "objectId": {
            console.log("처리되지 않은", key, type);
            continue;
          }
          // 주소
          case "address": {
            isRequired = false;
            element = (
              <FormModalAddress
                name={`${schema.name}.properties.${key}`}
                defaultValue={defaultValue ?? {}}
                onChange={(result: any) => editData({ key, value: result })}
              />
            );
            break;
          }
          default: {
            // 외부 테이블 및 스키마 처리
            isRequired = false;
            element = (
              <FormModalInput
                name={`${schema.name}.properties.${key}`}
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

        setInputList((state) => [
          ...state,
          {
            name: key,
            element,
            isRequired,
          },
        ]);
      } else {
        setDisabledDataList((state) => [
          ...state,
          {
            key: `${schema.name}.properties.${key}`,
            type,
            value: defaultValue,
          },
        ]);
      }
    }

    // 정렬
    setInputList((state) =>
      state.sort((formItem1, formItem2) => {
        let a = 0,
          b = 0;

        if (sortData[schema.name]) {
          a = sortData[schema.name][formItem1.name] ?? 99;
          b = sortData[schema.name][formItem2.name] ?? 99;
        }

        // 필수 필드라면 반드시 맨 앞으로
        if (formItem1.isRequired) a = -1;
        if (formItem2.isRequired) b = -1;

        try {
          return a - b;
        } catch (error) {
          console.error(error);
          return 0;
        }
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue, database]);

  // 데이터 수정시
  function editData(props: { key: string; value: any }) {
    setEditedDocument((state) => ({
      ...state,
      [props.key]: props.value,
    }));
  }

  function onClose() {
    setEditedDocument({});
    props.onClose();
  }

  return (
    <FormModalPopup
      title={mode === "insert" ? "추가" : "수정"}
      isOpen={props.isOpen}
      isSaveDisabled={Object.keys(editedDocument).length === 0}
      onSubmit={() => {
        onChange({
          type: mode,
          document: editedDocument,
          initialValue,
        });
      }}
      onClose={onClose}
      info={
        // 수정 모드일 때만 추가
        mode === "update" ? <FormModalInfo dataList={disabledDataList} /> : ""
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
