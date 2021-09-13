import moment from "moment";
import { Input, Switch } from "@chakra-ui/react";

export default function FormModalInput(props: {
  type: "int" | "date" | "bool";
  defaultValue: any;
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
      let value: string = "";
      if (defaultValue) value = moment(defaultValue).format("YYYY-MM-DD");

      return (
        <Input
          onChange={(event) => {
            onChange(event.target.value);
          }}
          type="date"
          defaultValue={value}
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
