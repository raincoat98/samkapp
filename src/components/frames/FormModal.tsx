import React from "react";
import Moment from "moment";
import ModalComponent from "components/frames/ModalComponent";
import DaumAddressPopup from "components/frames/DaumAddressPopup";
import {
  useDisclosure,
  Box,
  Tag,
  Stack,
  Button,
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
  const formRef = React.useRef<HTMLFormElement>(null);

  const formItemRecord: Record<string, formItem> = {};
  const formItemKeyList: string[] = [];

  const disabledFormItemRecord: Record<string, formItem> = {};
  const disabledFormItemKeyList: string[] = [];

  const addressPopupDisclosure = useDisclosure();
  const [addressPopupOpner, setAddressPopupOpner] = React.useState({
    formItemKey: "",
    dataKey: "",
  });

  const formItemRefRecord = React.useRef<Record<string, any>>({});

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

      formItemRefRecord.current[key] = React.createRef();

      switch (type) {
        case "string": {
          // 주소 값인지 판단
          if (key.includes("address")) {
            element = (
              <Box display="flex">
                <Input
                  type="text"
                  defaultValue={defaultValue}
                  onChange={(event) => {
                    onEdited({ key, value: event.target.value });
                  }}
                  ref={formItemRefRecord.current[key]}
                  mr={3}
                />
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
          } else {
            element = (
              <Input
                type="text"
                defaultValue={defaultValue}
                onChange={(event) => {
                  onEdited({ key, value: event.target.value });
                }}
              />
            );
          }

          break;
        }
        case "int": {
          element = (
            <Input
              type="number"
              defaultValue={defaultValue}
              onChange={(event) => {
                onEdited({ key, value: event.target.value });
              }}
            />
          );
          break;
        }
        case "date": {
          element = (
            <Input
              type="date"
              defaultValue={defaultValue}
              onChange={(event) => {
                onEdited({ key, value: event.target.value });
              }}
            />
          );
          break;
        }
        case "bool": {
          const checked = defaultValue ? true : false;
          element = (
            <Switch
              defaultChecked={checked}
              onChange={(event) => {
                onEdited({ key, value: event.target.checked });
              }}
            />
          );
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

      formItemKeyList.push(key);
      formItemRecord[key] = { element, isRequired, isInline };
    } else {
      // 데이터 기본 키와 같을 경우 넣지 않음, 새로 작성할 때도 넣지 않음
      if (key === schmea.primaryKey || mode === "insert") continue;

      const name = key.replace("_", "");

      switch (type) {
        case "date": {
          // 수정 불가능한 date 값
          element = (
            <Tag>
              {`${name}: `}
              {Moment(defaultValue)
                .local()
                .format("YYYY년 MM월 DD일 a h시 m분")}
            </Tag>
          );
        }
      }

      disabledFormItemKeyList.push(key);
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
        <form action="" ref={formRef}>
          <Stack>
            {formItemKeyList.map((formItemKey, index) => (
              <FormControl
                id={formItemKey}
                isRequired={formItemRecord[formItemKey].isRequired}
                key={index}
                display={formItemRecord[formItemKey].isInline ? "flex" : ""}
                alignItems="center"
              >
                <FormLabel>{formItemKey}</FormLabel>
                {formItemRecord[formItemKey].element}
              </FormControl>
            ))}

            {mode === "insert" ? "" : <Divider />}

            {disabledFormItemKeyList.map((formItemKey, index) =>
              disabledFormItemRecord[formItemKey].element ? (
                <Box key={index}>
                  {disabledFormItemRecord[formItemKey].element}
                </Box>
              ) : (
                ""
              )
            )}
          </Stack>
        </form>
      </ModalComponent>
    </>
  );
}
