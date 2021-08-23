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

export default function InventoryModalComponent(
  props: ModalProps & {
    initialValue?: any;
    schmea: { name: string; primaryKey: string; properties: any };
    mode: string;
    onSave: Function;
  }
) {
  const { onSave, initialValue, schmea, mode } = props;
  const formRef = React.useRef<HTMLFormElement>(null);
  const schmeaList: {
    key: string;
    type: string;
    inputType: string;
    defaultValue: any;
    isRequired: boolean;
  }[] = [];

  for (const key in schmea.properties) {
    if (Object.prototype.hasOwnProperty.call(schmea.properties, key)) {
      let isRequired = true;
      let type = schmea.properties[key];
      let inputType = "";
      const defaultValue = initialValue ? initialValue[key] : "";

      if (key !== schmea.primaryKey && key !== "user_id") {
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
        inputType = "hidden";
      }

      schmeaList.push({ key, type, inputType, defaultValue, isRequired });
    }
  }

  return (
    <ModalComponent
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered={true}
      size="2xl"
      scrollBehavior="inside"
      headerChildren={mode === "add" ? "추가" : "수정"}
      footerChildren={
        <ButtonGroup>
          <Button
            type="submit"
            onClick={() => {
              onSave(formRef.current);
            }}
            colorScheme="blue"
          >
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
