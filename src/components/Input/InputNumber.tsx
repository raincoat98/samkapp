import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

export default function InputNumber(props: {
  onChange: (value: number) => void;
  defaultValue?: number;
  min?: number;
}) {
  return (
    <NumberInput
      defaultValue={props.defaultValue}
      onChange={(value) => props.onChange(Number(value))}
      min={props.min ?? 0}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}
