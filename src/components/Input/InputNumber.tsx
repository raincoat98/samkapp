import { Input } from "@chakra-ui/react";

export default function InputNumber(props: {
  onChange: (value: number) => void;
  defaultValue?: number;
}) {
  return (
    <Input
      type="number"
      onChange={(event) => props.onChange(event.target.valueAsNumber)}
      defaultValue={props.defaultValue}
    />
  );
}
