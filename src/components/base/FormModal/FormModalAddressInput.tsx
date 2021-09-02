import { Box, Input, InputProps, Button, ButtonProps } from "@chakra-ui/react";

export default function FormModalAddressInput(props: {
  inputProps: InputProps | any;
  buttonProps: ButtonProps | any;
}) {
  const { inputProps, buttonProps } = props;

  return (
    <Box display="flex">
      <Input mr={3} {...inputProps} />
      <Button {...buttonProps}>주소 검색</Button>
    </Box>
  );
}
