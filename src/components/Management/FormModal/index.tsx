import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { schemaType } from "utils/realmUtils";
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

  // 필수 값
  const [requiredInputList, setRequiredInputList] = React.useState<formItem[]>(
    []
  );
  // 일반 값
  const [inputList, setInputList] = React.useState<formItem[]>([]);
  // 수정 불가능 값
  const [disabledDataList, setDisabledDataList] = React.useState<
    FormModalInfoData[]
  >([]);

  // 데이터베이스
  const database = useSelector((state: RootState) => state.realm.database);
  const readonlySchemaKeyList = useSelector(
    (state: RootState) => state.realm.readonlySchemaKeyList
  );
  const disabledSchemaKeyList = useSelector(
    (state: RootState) => state.realm.disabledSchemaKeyList
  );
  const textAreaSchemaKeyList = useSelector(
    (state: RootState) => state.realm.textAreaSchemaKeyList
  );

  // initialValue 가 바뀔 때만 기본값 수정
  React.useEffect(() => {
    // 초기화
    setRequiredInputList([]);
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
          // 작업 지시 우선순위
          case "work_order_priorities": {
            isRequired = false;
            element = (
              <FormModalWorkOrderPriorities
                defaultValue={defaultValue}
                onChange={(selected: string) =>
                  editData({
                    key,
                    value: { [selected]: true },
                  })
                }
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

        if (isRequired) {
          setRequiredInputList((state) => [
            ...state,
            {
              name: key,
              element,
            },
          ]);
        } else {
          setInputList((state) => [
            ...state,
            {
              name: key,
              element,
            },
          ]);
        }
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
    if (sortData[schema.name]) {
      setInputList((state) =>
        state.sort((formItem1, formItem2) => {
          const a = sortData[schema.name][formItem1.name] ?? 99;
          const b = sortData[schema.name][formItem2.name] ?? 99;

          try {
            return a - b;
          } catch (error) {
            console.error(error);
            return 0;
          }
        })
      );
    }

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
        {/* 필수 필드 */}
        {requiredInputList.map((formItem, index) => (
          <Box key={index}>{formItem.element}</Box>
        ))}

        {/* 선택 필드 */}
        {inputList.map((formItem, index) => (
          <Box key={index}>{formItem.element}</Box>
        ))}
      </Stack>
    </FormModalPopup>
  );
}
