import React from "react";
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Moment from "moment";
import validator from "validator";
import ModalComponent from "components/base/ModalComponent";
import DaumAddressPopup from "components/base/DaumAddressPopup";
import {
  useDisclosure,
  Box,
  Tag,
  Stack,
  Button,
  IconButton,
  Input,
  Switch,
  ButtonGroup,
  FormControl,
  FormLabel,
  Divider,
  ModalProps,
} from "@chakra-ui/react";

export type modeType = string | "insert" | "update";
export type formItem = {
  element?: JSX.Element;
  isDisabled?: boolean;
  isRequired?: boolean;
  isInline?: boolean;
};

export default function InventoryModalComponent(
  props: ModalProps & {
    initialValue?: any;
    schmea: Record<string, any>;
    mode: modeType;
    onChange: Function;
  }
) {
  const [editedDocument, setEditedDocument] = React.useState<
    Record<string, any>
  >({});
  const { onChange, initialValue, schmea, mode } = props;

  // 번역
  const { t } = useTranslation();

  const formItemRecord: Record<string, formItem> = {};
  const disabledFormItemRecord: Record<string, formItem> = {};
  const formItemRefRecord = React.useRef<Record<string, any>>({});

  const addressPopupDisclosure = useDisclosure();
  const [addressPopupOpner, setAddressPopupOpner] = React.useState({
    formItemKey: "",
    dataKey: "",
  });

  // 외부 링크 아이콘
  const ExternalLinkIcon = useSelector(
    (state: RootState) => state.icon.externalLink
  );

  for (const key in schmea.properties) {
    let type = schmea.properties[key];
    let defaultValue = initialValue ? initialValue[key] : undefined;
    let element;

    // ? 로 끝나는 것은 필수값이 아님
    const isRequired = type.endsWith("?") ? false : true;
    if (type.endsWith("?")) {
      type = type.replaceAll("?", "");
    }

    // key가 _로 시작하는 값은 유저가 수정할 수 없는 값
    if (!key.startsWith("_")) {
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
            onEdited({ key, value: event.target.value });
          };

          // 주소 값인지 판단
          if (key.includes("address")) {
            element = (
              <Box display="flex">
                <Input mr={3} {...options} />
                <Button
                  onClick={() => {
                    addressPopupDisclosure.onToggle();
                    setAddressPopupOpner({
                      formItemKey: key,
                      dataKey: "fullAddress",
                    });
                  }}
                >
                  주소 검색
                </Button>
              </Box>
            );
            // URL 값일 때
          } else if (key.includes("homepage") || key.includes("url")) {
            element = (
              <Box display="flex">
                <Input mr={3} {...options} />
                <IconButton
                  aria-label="페이지 열기"
                  onClick={() => {
                    const value = formItemRefRecord.current[key].current.value;
                    if (validator.isURL(value)) window.open(value);
                  }}
                  icon={<ExternalLinkIcon />}
                />
              </Box>
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
            onEdited({ key, value: event.target.value });
          };

          element = <Input {...options} />;
          break;
        }
        case "date": {
          options.type = "date";
          options.defaultValue = defaultValue;
          options.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            onEdited({ key, value: event.target.value });
          };

          element = <Input {...options} />;
          break;
        }
        case "bool": {
          options.defaultChecked = defaultValue ? true : false;
          options.onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            onEdited({ key, value: event.target.checked });
          };

          element = <Switch {...options} />;
          isInline = true;
          break;
        }
        case "objectId": {
          continue;
        }
        default: {
          console.log("알 수 없는 타입: ", type);
        }
      }

      formItemRecord[key] = { element, isRequired, isInline };
    } else {
      // 데이터 기본 키와 같을 경우 넣지 않음, 새로 작성할 때도 넣지 않음
      if (key === schmea.primaryKey || mode === "insert") continue;

      // const name = key.replace("_", "");

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

      disabledFormItemRecord[key] = {
        element,
        // 수정 불가
        isDisabled: true,
        isInline: true,
      };
    }
  }

  function onEdited(props: { key: string; value: any }) {
    setEditedDocument({ ...editedDocument, ...{ [props.key]: props.value } });
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

    onEdited({
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

          {/* Warning: Each child in a list should have a unique "key" prop. */}
          {/* 키 오류 아마 불확실하게 자식이 리턴되어서 그런 듯 */}
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