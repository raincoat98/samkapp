import { Input, Textarea } from "@chakra-ui/react";

export default function InputString(props: {
  onChange: (value: string) => void;
  defaultValue?: string;
  isTextarea?: boolean;
}) {
  let element: JSX.Element;

  // input인지 textarea인지 구분
  if (!props.isTextarea) {
    element = (
      <Input
        onChange={(event) => props.onChange(event.target.value)}
        defaultValue={props.defaultValue}
      />
    );
  } else {
    element = (
      <Textarea
        onChange={(event) => props.onChange(event.target.value)}
        defaultValue={props.defaultValue}
      />
    );
  }

  return element;
}
