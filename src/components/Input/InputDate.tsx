import { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import moment from "moment";

export default function InputDate(props: {
  onChange: (value: Date | undefined) => void;
  defaultValue?: Date;
  isMonth?: boolean;
  isAvailableBeforeToday?: boolean;
}) {
  const [value, setValue] = useState<Date | undefined>(props.defaultValue);
  useEffect(() => setValue(props.defaultValue), [props]);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value: Date | undefined;
    if (event.target.valueAsDate === null) value = undefined;
    else value = event.target.valueAsDate;
    setValue(value);
    props.onChange(value);
  }

  if (props.isMonth) {
    return (
      <Input
        type="month"
        onChange={onChange}
        value={value && moment(value).format("YYYY-MM")}
      />
    );
  } else {
    return (
      <Input
        type="date"
        onChange={onChange}
        value={value && moment(value).format("YYYY-MM-DD")}
        min={
          props.isAvailableBeforeToday
            ? undefined
            : moment().format("YYYY-MM-DD")
        }
      />
    );
  }
}
