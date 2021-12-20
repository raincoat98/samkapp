import { Input } from "@chakra-ui/react";
import moment from "moment";

export default function InputDate(props: {
  onChange: (value: Date | null) => void;
  defaultValue?: Date;
  isMonth?: boolean;
}) {
  if (props.isMonth) {
    return (
      <Input
        type="month"
        onChange={(event) => props.onChange(event.target.valueAsDate)}
        defaultValue={
          props.defaultValue ? moment(props.defaultValue).format("YYYY-MM") : ""
        }
      />
    );
  } else {
    return (
      <Input
        type="date"
        onChange={(event) => props.onChange(event.target.valueAsDate)}
        defaultValue={
          props.defaultValue
            ? moment(props.defaultValue).format("YYYY-MM-DD")
            : ""
        }
        min={moment().format("YYYY-MM-DD")}
      />
    );
  }
}
