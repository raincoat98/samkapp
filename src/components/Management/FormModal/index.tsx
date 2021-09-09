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
  Divider,
  ModalProps,
} from "@chakra-ui/react";

export type formItem = {
  element?: JSX.Element;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInline?: boolean;
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

  const [formItemRecord, setFormItemRecord] = React.useState<
    Record<string, formItem>
  >({});
  const [disabledFormItemRecord, setDisabledFormItemRecord] = React.useState<
    Record<string, formItem>
  >({});
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
        let isInline = false;
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
            isInline = true;
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
                placeholder={translate(`${schema.name}.properties.${key}`)}
                defaultValue={defaultValue?.toString()}
                onFocus={() => dispatch(setCollectionData(type))}
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

            setFormItemRecord((state) => ({
              ...state,
              [key]: { element, isRequired, isInline },
            }));

            break;
          }
        }

        setFormItemRecord((state) => ({
          ...state,
          [key]: { element, isRequired, isInline },
        }));
      } else {
        switch (type) {
          case "date": {
            // 수정 불가능한 date 값
            element = (
              <Tag>
                {translate(`${schema.name}.properties.${key}`) + ": "}
                {Moment(defaultValue)
                  .local()
                  .format("YYYY년 MM월 DD일 a h시 m분")}
              </Tag>
            );
          }
        }

        setDisabledFormItemRecord((state) => ({
          ...state,
          [key]: { element, isRequired },
        }));
      }
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
          {Object.keys(formItemRecord).map((key) => (
            <FormControl
              id={key}
              isRequired={formItemRecord[key].isRequired}
              display={formItemRecord[key].isInline ? "flex" : ""}
              alignItems="center"
              key={key}
            >
              <FormLabel>
                {translate(`${schema.name}.properties.${key}`)}
              </FormLabel>
              {formItemRecord[key].element}
            </FormControl>
          ))}

          {mode === "insert" ? "" : <Divider />}

          {Object.keys(disabledFormItemRecord).map((key) =>
            disabledFormItemRecord[key].element ? (
              <Box key={key}>{disabledFormItemRecord[key].element}</Box>
            ) : (
              ""
            )
          )}
        </Stack>
      </FormModalPopup>
    </>
  );
}
