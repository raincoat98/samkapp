import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { Input, HStack, Icon, IconButton } from "@chakra-ui/react";
import { plus, minus } from "utils/icons";

export default function InputNumber(props: {
  onChange: (value: number) => void;
  defaultValue?: number;
  isDisabled?: boolean;
  min?: number;
  max?: number;
}) {
  const [value, setValue] = useState<number | undefined>(
    props.defaultValue ?? undefined
  );

  const minValue = props.min !== undefined ? props.min : 0;
  const maxValue =
    props.max !== undefined ? props.max : Number.MAX_SAFE_INTEGER;

  useEffect(() => setValue(props.defaultValue), [props]);

  return (
    <HStack>
      <IconButton
        icon={<Icon as={minus} />}
        onClick={() => {
          if (value !== undefined && value > minValue) setValue(value - 1);
          else setValue(minValue);
        }}
        isDisabled={props.isDisabled}
        size={"sm"}
        aria-label="1 빼기"
      />

      <NumberFormat
        value={value}
        onValueChange={(event) => {
          setValue(event.floatValue);
          props.onChange(event.floatValue !== undefined ? event.floatValue : 0);
        }}
        isAllowed={(values) => {
          if (values.floatValue !== undefined) {
            return (
              values.floatValue >= minValue && values.floatValue <= maxValue
            );
          }
          return true;
        }}
        isDisabled={props.isDisabled}
        customInput={Input}
        thousandSeparator={true}
      />

      <IconButton
        icon={<Icon as={plus} />}
        onClick={() => {
          if (value === undefined) setValue(1);
          else if (value < maxValue) setValue(value + 1);
        }}
        isDisabled={props.isDisabled}
        size={"sm"}
        aria-label="1 더하기"
      />
    </HStack>
  );
}
