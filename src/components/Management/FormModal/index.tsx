import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { schemaType } from "utils/realmUtils";
import FormModalInput from "./FormModalInput";
import FormModalAddress from "./FormModalAddress";
import FormModalURLInput from "./FormModalURLInput";
import FormModalInfo, { FormModalInfoData } from "./FormModalInfo";
import FormModalPopup from "./FormModalPopup";
import FormModalRefExternal from "./FormModalRefExternal";
import sortData from "data/sortData";
import {
  Box,
  Stack,
  Input,
  InputProps,
  FormControl,
  FormLabel,
  ModalProps,
} from "@chakra-ui/react";

export type formItem = {
  name: string;
  element?: JSX.Element;
  isDisabled?: boolean;
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

  // 번역
  const { t: translate } = useTranslation();

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
          case "string": {
            defaultValue = defaultValue as string;

            const inputProps: InputProps = {};
            inputProps.type = "text";
            inputProps.defaultValue = defaultValue;
            inputProps.onChange = (
              event: React.ChangeEvent<HTMLInputElement>
            ) => {
              editData({ key, value: event.target.value });
            };

            // 주소 값인지 판단
            if (key.includes("address")) {
              element = (
                <FormModalAddress
                  defaultValue={defaultValue}
                  onChange={(fullAddress: string) =>
                    editData({ key, value: fullAddress })
                  }
                />
              );
              // URL 값일 때
            } else if (key.includes("homepage") || key.includes("url")) {
              element = <FormModalURLInput inputProps={{ ...inputProps }} />;
            } else {
              // 수정 모드에서 고유 키 값을 변경하지 못하게
              if (mode === "update" && key === schema.primaryKey) {
                inputProps.isReadOnly = true;
                inputProps.variant = "filled";
                inputProps.title = "고유 코드 값은 수정할 수 없습니다.";
              }
              element = <Input {...inputProps} />;
            }

            break;
          }
          case "int":
          case "date":
          case "bool": {
            element = (
              <FormModalInput
                type={type}
                defaultValue={defaultValue}
                onChange={(value: any) => editData({ key, value })}
              />
            );
            break;
          }
          case "objectId": {
            console.log("처리되지 않은", key, type);
            continue;
          }
          default: {
            // 외부 테이블 처리
            isRequired = false;

            element = (
              <FormModalRefExternal
                collectionName={type}
                defaultValue={defaultValue?.toString()}
                onChange={(value: string) => {
                  editData({
                    key,
                    value,
                  });
                }}
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
          try {
            return (
              sortData[schema.name][formItem1.name] -
              sortData[schema.name][formItem2.name]
            );
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
          <FormControl
            isRequired={true}
            display="flex"
            alignItems="center"
            key={index}
          >
            <FormLabel minWidth="100px" marginBottom={0}>
              {translate(`${schema.name}.properties.${formItem.name}`)}
            </FormLabel>
            <Box flex="1">{formItem.element}</Box>
          </FormControl>
        ))}

        {/* 선택 필드 */}
        {inputList.map((formItem, index) => (
          <FormControl display="flex" alignItems="center" key={index}>
            <FormLabel minWidth="100px" marginBottom={0}>
              {translate(`${schema.name}.properties.${formItem.name}`)}
            </FormLabel>
            <Box flex="1">{formItem.element}</Box>
          </FormControl>
        ))}
      </Stack>
    </FormModalPopup>
  );
}
