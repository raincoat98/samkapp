import React from "react";
import Moment from "moment";
import ModalComponent from "components/frames/ModalComponent";
import {
  Stack,
  Button,
  Input,
  ButtonGroup,
  FormControl,
  FormLabel,
  Divider,
  InputProps,
  ModalProps,
} from "@chakra-ui/react";

export type modeType = string | "insert" | "update";
export type inputType = {
  key: string;
  type: string;
  inputOptions: InputProps;
  defaultValue: any;
  isRequired: boolean;
};

export default function InventoryModalComponent(
  props: ModalProps & {
    initialValue?: any;
    schmea: Record<string, any>;
    mode: modeType;
    onChange: Function;
  }
) {
  const { onChange, initialValue, schmea, mode } = props;
  const formRef = React.useRef<HTMLFormElement>(null);
  const inputList: inputType[] = [];
  const disabledInputList: inputType[] = [];

  for (const key in schmea.properties) {
    let isRequired = true;
    let type = schmea.properties[key];
    const inputOptions: InputProps = {};
    let defaultValue = initialValue ? initialValue[key] : "";

    if (!key.startsWith("_")) {
      // ? 로 끝나는 것은 필수값이 아님
      if (type.endsWith("?")) {
        isRequired = false;
        type = type.replaceAll("?", "");
      }

      switch (type) {
        case "string": {
          inputOptions.type = "text";
          break;
        }
        case "int": {
          inputOptions.type = "number";
          break;
        }
        case "date": {
          inputOptions.type = "date";
          break;
        }
      }
      inputList.push({ key, type, inputOptions, defaultValue, isRequired });
    } else {
      // 데이터 기본 키와 같을 경우 넣지 않음
      if (key === schmea.primaryKey) continue;
      inputOptions.type = "text";
      inputOptions.isDisabled = true;

      if (type === "date") {
        defaultValue = Moment(defaultValue)
          .local()
          .format("YYYY년 MM월 DD일 a h시 m분");
      }

      disabledInputList.push({
        key,
        type,
        inputOptions,
        defaultValue,
        isRequired,
      });
    }
  }

  function onSave() {
    const doc: Record<string, any> = {};

    for (const key in schmea.properties) {
      // form 에서 값 가져오기
      if (formRef.current) {
        const inputElement = formRef.current.querySelector<HTMLInputElement>(
          `#${key}`
        );

        if (inputElement) {
          if (inputElement.disabled) continue;

          let inputElementValue: string | number = inputElement.value;
          const inputElementType = inputElement.type;

          switch (inputElementType) {
            case "number": {
              inputElementValue = Number(inputElementValue);
              break;
            }
          }

          // inputElementValue가 0일경우 false가 나오므로 undefined 비교 사용
          if (inputElementValue !== undefined) {
            if (!initialValue || initialValue[key] !== inputElementValue) {
              doc[key] = inputElementValue;
            }
          }
        }
      }
    }

    onChange({
      type: mode,
      document: doc,
      initialValue,
    });
  }

  return (
    <ModalComponent
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered={true}
      size="2xl"
      scrollBehavior="inside"
      headerChildren={mode === "insert" ? "추가" : "수정"}
      footerChildren={
        <ButtonGroup>
          <Button type="submit" onClick={onSave} colorScheme="blue">
            저장
          </Button>
          <Button onClick={props.onClose}>닫기</Button>
        </ButtonGroup>
      }
    >
      <form action="" ref={formRef}>
        <Stack>
          {inputList.map((schmea, index) => (
            <FormControl
              id={schmea.key}
              isRequired={schmea.isRequired}
              key={index}
            >
              <FormLabel>{schmea.key}</FormLabel>
              <Input
                type={schmea.inputOptions.type}
                isDisabled={schmea.inputOptions.isDisabled}
                defaultValue={schmea.defaultValue}
              />
            </FormControl>
          ))}

          <Divider py={2} />

          {disabledInputList.map((schmea, index) => (
            <FormControl
              id={schmea.key}
              isDisabled={schmea.inputOptions.isDisabled}
              pt={2}
              key={index}
            >
              <FormLabel>{schmea.key}</FormLabel>
              <Input
                type={schmea.inputOptions.type}
                defaultValue={schmea.defaultValue}
              />
            </FormControl>
          ))}
        </Stack>
      </form>
    </ModalComponent>
  );
}
