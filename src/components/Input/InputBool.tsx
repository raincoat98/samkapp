import { Switch } from "@chakra-ui/react";

export default function InputBool(props: {
  onChange: (value: boolean) => void;
  isDefaultTrue?: boolean;
  isDisabled?: boolean;
}) {
  return (
    <Switch
      onChange={(event) => props.onChange(event.target.checked)}
      defaultChecked={props.isDefaultTrue ? true : false}
      isDisabled={props.isDisabled}
      size={"lg"}
    />
  );
}
