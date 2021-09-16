import { useTranslation } from "react-i18next";
import { work_order_prioritiesSchema } from "realmObjectModes";
import {
  FormControl,
  FormLabel,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

export default function FormModalWorkOrderPriorities(props: {
  defaultValue: any;
  onChange: Function;
}) {
  const { defaultValue, onChange } = props;
  const { t: translate } = useTranslation();

  let radioDefaultValue = "";
  if (defaultValue && Object.keys(defaultValue)) {
    radioDefaultValue = Object.keys(defaultValue)[0];
  } else {
    radioDefaultValue = "normal";
  }

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel minWidth="100px" marginBottom={0}>
        {translate(`${work_order_prioritiesSchema.name}.name`)}
      </FormLabel>
      <RadioGroup
        defaultValue={radioDefaultValue}
        onChange={(value) => onChange(value)}
      >
        <Stack direction="row">
          {Object.keys(work_order_prioritiesSchema.properties).map(
            (key, index) => (
              <Radio value={key} key={index}>
                {translate(
                  `${work_order_prioritiesSchema.name}.properties.${key}`
                )}
              </Radio>
            )
          )}
        </Stack>
      </RadioGroup>
    </FormControl>
  );
}
