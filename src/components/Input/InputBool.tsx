import { Switch } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function InputBool(props: {
  onChange: (value: boolean) => void;
  isDefaultTrue?: boolean;
  isDisabled?: boolean;
}) {
  const [value, setValue] = useState<boolean | undefined>(props.isDefaultTrue);

  useEffect(() => setValue(props.isDefaultTrue), [props]);

  return (
    <Switch
      onChange={(event) => {
        setValue(event.target.checked);
        props.onChange(event.target.checked);
      }}
      isChecked={value}
      isDisabled={props.isDisabled}
      size={"lg"}
    />
  );
}
