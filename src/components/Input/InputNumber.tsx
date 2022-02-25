import { useEffect, useState } from "react";
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
  const [value, setValue] = useState<number | undefined>(
    props.defaultValue ?? undefined
  );

  useEffect(() => setValue(props.defaultValue), [props]);

  return (
    <NumberInput
      value={value}
      onChange={(value) => {
        setValue(Number(value));
        props.onChange(Number(value));
      }}
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
