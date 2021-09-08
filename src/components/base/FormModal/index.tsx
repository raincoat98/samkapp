import React from "react";
import { RootState } from "store";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCollectionData } from "store/realm";
import Moment from "moment";
import validator from "validator";
import { ObjectId } from "bson";
import ModalComponent from "components/base/ModalComponent";
import DaumAddressPopup from "components/base/DaumAddressPopup";
import FormModalAddressInput from "./FormModalAddressInput";
import FormModalURLInput from "./FormModalURLInput";
import {
  useDisclosure,
  Box,
  Tag,
  Stack,
  Button,
  Input,
  Switch,
  Select,
  ButtonGroup,
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
    schmea: Record<string, any>;
    mode: "insert" | "update" | string;
    onChange: Function;
  }
) {
  const [editedDocument, setEditedDocument] = React.useState<
    Record<string, any>
  >({});
  const { onChange, initialValue, schmea, mode } = props;

  const dispatch = useDispatch();
  // 번역
  const { t } = useTranslation();

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
    for (const key in schmea.properties) {
      // 데이터 기본 키와 같을 경우 || 유저가 수정 못하는 값일 경우 다음으로
      if (
        key === schmea.primaryKey ||
        !!disabledSchemaKeyList.filter((disabledKey) => disabledKey === key)
          .length
      )
        continue;

      let type = schmea.properties[key];
      let defaultValue = initialValue ? initialValue[key] : undefined;
      let element: JSX.Element;

      // ? 로 끝나는 것은 필수값이 아님
      const isRequired = type.endsWith("?") ? false : true;
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
            element = (
              <Select
                placeholder={t(`table_field.${key}`)}
                defaultValue={defaultValue?.toString()}
                onFocus={() => dispatch(setCollectionData(type))}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                  const value = event.target.value
                    ? new ObjectId(event.target.value)
                    : null;
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
                {`${t("table_field." + key)}: `}
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

      <ModalComponent
        isOpen={props.isOpen}
        onClose={onClose}
        isCentered={true}
        size="2xl"
        scrollBehavior="inside"
        headerChildren={mode === "insert" ? "추가" : "수정"}
        footerChildren={
          <ButtonGroup>
            <Button
              type="submit"
              onClick={() => {
                onChange({
                  type: mode,
                  document: editedDocument,
                  initialValue,
                });
              }}
              isDisabled={Object.keys(editedDocument).length === 0}
              colorScheme="blue"
            >
              저장
            </Button>
            <Button onClick={onClose}>닫기</Button>
          </ButtonGroup>
        }
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
              <FormLabel>{t(`table_field.${key}`)}</FormLabel>
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
      </ModalComponent>
    </>
  );
}
