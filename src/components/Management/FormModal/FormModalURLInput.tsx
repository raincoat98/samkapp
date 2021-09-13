import React from "react";
import validator from "validator";
import { externalLink } from "utils/icons";
import { Box, Icon, Input, InputProps, IconButton } from "@chakra-ui/react";

export default function FormModalURLInput(props: {
  inputProps: InputProps | any;
}) {
  const { inputProps } = props;

  const inputEl = React.useRef<HTMLInputElement>(null);

  return (
    <Box display="flex">
      <Input ref={inputEl} type="text" {...inputProps} mr={3} />
      <IconButton
        aria-label="페이지 열기"
        icon={<Icon as={externalLink} />}
        onClick={() => {
          if (inputEl.current) {
            const value = inputEl.current.value;
            if (validator.isURL(value)) window.open(value);
          }
        }}
      />
    </Box>
  );
}
