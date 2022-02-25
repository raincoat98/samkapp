import { useEffect, useState } from "react";
import { Input, Textarea } from "@chakra-ui/react";

export default function InputString(props: {
  onChange: (value: string) => void;
  defaultValue?: string;
  isTextarea?: boolean;
}) {
  const [value, setValue] = useState<string>(props.defaultValue ?? "");

  let element: JSX.Element;

  useEffect(() => setValue(props.defaultValue ?? ""), [props]);

  // input인지 textarea인지 구분
  if (!props.isTextarea) {
    element = (
      <Input
        onChange={(event) => {
          setValue(event.target.value);
          props.onChange(event.target.value);
        }}
        value={value}
      />
    );
  } else {
    element = (
      <Textarea
        onChange={(event) => {
          setValue(event.target.value);
          props.onChange(event.target.value);
        }}
        value={value}
      />
    );
  }

  return element;
}
