import { Switch } from "@chakra-ui/react";

export default function InputBool(props: {
  onChange: (value: boolean) => void;
  isDefaultTrue?: boolean;
}) {
  return (
    <Switch
      onChange={(event) => props.onChange(event.target.checked)}
      defaultChecked={props.isDefaultTrue ? true : false}
    />
  );
}
