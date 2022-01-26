import React from "react";
import { useColorModeValue, Checkbox } from "@chakra-ui/react";
import { borderColor } from "theme";

export default function TableCheckbox(props: {
  checked: boolean;
  indeterminate: boolean;
  onChange: (checkbox: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { checked, indeterminate, onChange } = props;

  const borderColorValue = useColorModeValue(
    borderColor.light,
    borderColor.dark
  );

  return (
    <Checkbox
      isChecked={checked}
      isIndeterminate={indeterminate}
      onChange={(e) => onChange(e)}
      borderColor={borderColorValue}
    />
  );
}
