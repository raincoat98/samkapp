import React from "react";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCollectionData } from "store/realm";
import Moment from "moment";
import validator from "validator";
import { schemaType } from "utils/realmUtils";
import DaumAddressPopup from "components/base/DaumAddressPopup";
import FormModalAddressInput from "./FormModalAddressInput";
import FormModalURLInput from "./FormModalURLInput";
import FormModalPopup from "./FormModalPopup";
import sortData from "data/sortData";
import {
  useDisclosure,
  Box,
  Tag,
  Stack,
  Input,
  Switch,
  Select,
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

  const dispatch = useDispatch();
  // 번역
  const { t: translate } = useTranslation();

  // 필수 값
  const [requiredInputList, setRequiredInputList] = React.useState<formItem[]>(
    []
  );
  // 일반 값
  const [inputList, setInputList] = React.useState<formItem[]>([]);
  // 수정 불가능 값
  const [disabledInputList, setDisabledInputList] = React.useState<formItem[]>(
    []
  );
  // ref
  const formItemRefRecord = React.useRef<Record<string, any>>({});

  const database = useSelector((state: RootState) => state.realm.database);
  const readonlySchemaKeyList = useSelector(
    (state: RootState) => state.realm.readonlySchemaKeyList
  );
  const disabledSchemaKeyList = useSelector(
    (state: RootState) => state.realm.disabledSchemaKeyList
  );

  const addressPopupDisclosure = useDisclosure();
  const [addressPopupOpner, setAddressPopupOpner] = React.useState({
    formItemKey: "",
    dataKey: "",
  });

  // initialValue 가 바뀔 때만 기본값 수정
  React.useEffect(() => {
    // 초기화
    setRequiredInputList([]);
    setInputList([]);
    setDisabledInputList([]);

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
        const options: Record<string, any> = {};

        // ref 추가
        formItemRefRecord.current[key] = React.createRef();
        options.ref = formItemRefRecord.current[key];

        switch (type) {
          case "string": {
            defaultValue = defaultValue as string;
            options.type = "text";
            options.defaultValue = defaultValue;
            options.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
              editData({ key, value: event.target.value });
            };

            // 주소 값인지 판단
            if (key.includes("address")) {
              element = (
                <FormModalAddressInput
                  inputProps={{ ...options }}
                  buttonProps={{
                    onClick: () => {
                      addressPopupDisclosure.onToggle();
                      setAddressPopupOpner({
                        formItemKey: key,
                        dataKey: "fullAddress",
                      });
                    },
                  }}
                />
              );
              // URL 값일 때
            } else if (key.includes("homepage") || key.includes("url")) {
              element = (
                <FormModalURLInput
                  inputProps={{ ...options }}
                  buttonProps={{
                    onClick: () => {
                      const value =
                        formItemRefRecord.current[key].current.value;
                      if (validator.isURL(value)) window.open(value);
                    },
                  }}
                />
              );
            } else {
              element = <Input {...options} />;
            }

            break;
          }
          case "int": {
            options.type = "number";
            options.defaultValue = defaultValue;
            options.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
              editData({ key, value: event.target.value });
            };

            element = <Input {...options} />;
            break;
          }
          case "date": {
            options.type = "date";
            options.defaultValue = defaultValue;
            options.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
              editData({ key, value: event.target.value });
            };

            element = <Input {...options} />;
            break;
          }
          case "bool": {
            options.defaultChecked = defaultValue ? true : false;
            options.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
              editData({ key, value: event.target.checked });
            };

            element = <Switch {...options} />;
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
              <Select
                placeholder={"없음"}
                defaultValue={defaultValue?.toString()}
                onFocus={() => {
                  if (!database[type]) dispatch(setCollectionData(type));
                }}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  const value = event.target.value;
                  editData({
                    key,
                    value,
                  });
                }}
                {...options}
              >
                {database[type]?.map((item: any, index) => (
                  <option value={item._id.toString()} key={index}>
                    {item[`${type}_name`]}
                  </option>
                ))}
              </Select>
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
        switch (type) {
          case "date": {
            // 수정 불가능한 date 값
            element = (
              <Tag>
                {translate(`${schema.name}.properties.${key}`) + ": "}
                {Moment(defaultValue).local().format("YYYY-MM-DD H시 m분")}
              </Tag>
            );
          }
        }

        setDisabledInputList((state) => [
          ...state,
          {
            name: key,
            element,
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

  function onAddressComplete(data: Record<string, any>) {
    const value = data[addressPopupOpner.dataKey];

    const element =
      formItemRefRecord.current[addressPopupOpner.formItemKey].current;

    if (element) element.value = value;

    editData({
      key: addressPopupOpner.formItemKey,
      value,
    });

    addressPopupDisclosure.onClose();
  }

  return (
    <>
      <DaumAddressPopup
        isOpen={addressPopupDisclosure.isOpen}
        onClose={addressPopupDisclosure.onClose}
        isCentered={true}
        onComplete={onAddressComplete}
        children={null}
      />

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

          {/* 수정 모드일 때만 추가 */}
          {mode === "update" ? (
            <Stack textAlign="right">
              {disabledInputList.map((formItem, index) =>
                formItem.element ? (
                  <Box key={index}>{formItem.element}</Box>
                ) : (
                  ""
                )
              )}
            </Stack>
          ) : (
            ""
          )}
        </Stack>
      </FormModalPopup>
    </>
  );
}
