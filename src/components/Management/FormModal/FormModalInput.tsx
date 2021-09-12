import { Input, Switch } from "@chakra-ui/react";

export default function FormModalInput(props: {
  type: "int" | "date" | "bool";
  defaultValue: string | number;
  onChange: Function;
}) {
  const { type, defaultValue, onChange } = props;

  switch (type) {
    case "int": {
      return (
        <Input
          onChange={(event) => {
            onChange(event.target.value);
          }}
          type="number"
          defaultValue={defaultValue}
        />
      );
    }
    case "date": {
      return (
        <Input
          onChange={(event) => {
            onChange(event.target.value);
          }}
          type="date"
          defaultValue={defaultValue}
        />
      );
    }
    case "bool": {
      return (
        <Switch
          onChange={(event) => {
            onChange(event.target.checked);
          }}
          defaultChecked={defaultValue ? true : false}
        />
      );
    }
    default: {
      return (
        <Input
          onChange={(event) => {
            onChange(event.target.value);
          }}
          defaultValue={defaultValue}
        />
      );
    }
  }
}
