import { RootState } from "store";
import { useSelector } from "react-redux";
import {
  Box,
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

  // 외부 링크 아이콘
  const ExternalLinkIcon = useSelector(
    (state: RootState) => state.icon.externalLink
  );

  return (
    <Box display="flex">
      <Input mr={3} {...inputProps} />
      <IconButton
        aria-label="페이지 열기"
        icon={<ExternalLinkIcon />}
        {...buttonProps}
      />
    </Box>
  );
}
