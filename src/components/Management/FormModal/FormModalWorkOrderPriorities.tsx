import {
  FormControl,
  FormLabel,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

export type prioritiesEnum = "emergency" | "normal" | "other";

export default function FormModalWorkOrderPriorities(props: {
  defaultValue: any;
  onChange: Function;
}) {
  const { defaultValue, onChange } = props;

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel minWidth="100px" marginBottom={0}>
        우선 순위
      </FormLabel>
      <RadioGroup
        defaultValue={defaultValue}
        onChange={(value) => onChange(value)}
      >
        <Stack direction="row">
          <Radio value="emergency">긴급</Radio>
          <Radio value="normal">보통</Radio>
          <Radio value="other">기타</Radio>
        </Stack>
      </RadioGroup>
    </FormControl>
  );
}
