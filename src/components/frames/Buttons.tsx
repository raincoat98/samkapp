import {
  Button,
  ButtonProps,
  ButtonGroup,
  ButtonGroupProps,
} from "@chakra-ui/react";

export function BaseButtonGroups(props: ButtonGroupProps) {
  const { children, ...rest } = props;
  return (
    <ButtonGroup spacing="3" {...rest}>
      {children}
    </ButtonGroup>
  );
}

export function BaseButton(props: ButtonProps) {
  const { children, ...rest } = props;
  return <Button {...rest}>{children}</Button>;
}

export function AddButton(props: ButtonProps) {
  const { children, ...rest } = props;
  return (
    <BaseButton colorScheme="blue" {...rest}>
      {children ?? "추가"}
    </BaseButton>
  );
}

export function DeleteButton(props: ButtonProps) {
  const { children, ...rest } = props;
  return (
    <BaseButton colorScheme="red" {...rest}>
      {children ?? "삭제"}
    </BaseButton>
  );
}
