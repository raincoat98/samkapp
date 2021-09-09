import { externalLink } from "utils/icons";
import {
  Box,
  Icon,
  Input,
  InputProps,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";

export default function FormModalURLInput(props: {
  inputProps: InputProps | any;
  buttonProps: IconButtonProps | any;
}) {
  const { inputProps, buttonProps } = props;

  return (
    <Box display="flex">
      <Input mr={3} {...inputProps} />
      <IconButton
        aria-label="페이지 열기"
        icon={<Icon as={externalLink} />}
        {...buttonProps}
      />
    </Box>
  );
}
