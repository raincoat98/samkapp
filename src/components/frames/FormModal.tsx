import React from "react";
import ModalComponent from "components/frames/ModalComponent";
import {
  Stack,
  Button,
  Input,
  ButtonGroup,
  FormControl,
  FormLabel,
  ModalProps,
} from "@chakra-ui/react";

export type modeType = string | "insert" | "update";

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
  const schmeaList: {
    key: string;
    type: string;
    inputType: string;
    defaultValue: any;
    isRequired: boolean;
  }[] = [];

  for (const key in schmea.properties) {
    let isRequired = true;
    let type = schmea.properties[key];
    let inputType = "";
    const defaultValue = initialValue ? initialValue[key] : "";

    if (key !== schmea.primaryKey && key !== "user_id") {
      // ? 로 끝나는 것은 필수값이 아님
      if (type.endsWith("?")) {
        isRequired = false;
        type = type.replaceAll("?", "");
      }

      switch (type) {
        case "string": {
          inputType = "text";
          break;
        }
        case "int": {
          inputType = "number";
          break;
        }
        default: {
          inputType = "text";
        }
      }
    } else {
      continue;
    }

    schmeaList.push({ key, type, inputType, defaultValue, isRequired });
  }

  function onSave() {
    const doc: Record<string, any> = {};

    for (const key in schmea.properties) {
      // form 에서 값 가져오기
      if (formRef.current) {
        const inputElementValue =
          formRef.current.querySelector<HTMLInputElement>(`#${key}`)?.value;

        if (inputElementValue) {
          if (!initialValue || initialValue[key] !== inputElementValue) {
            doc[key] = inputElementValue;
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
          {schmeaList.map((schmea, index) => (
            <FormControl
              id={schmea.key}
              isRequired={schmea.isRequired}
              hidden={schmea.inputType === "hidden"}
              key={index}
            >
              <FormLabel>{schmea.key}</FormLabel>
              <Input
                type={schmea.inputType}
                defaultValue={schmea.defaultValue}
              />
            </FormControl>
          ))}
        </Stack>
      </form>
    </ModalComponent>
  );
}
