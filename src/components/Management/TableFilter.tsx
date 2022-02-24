import { Select, FormControl, FormLabel } from "@chakra-ui/react";

type pageIndex = number | undefined;

export type filter = {
  title: string;
  data: string[];
  onFilterChange: (props: { index: pageIndex }) => void;
  allowNull?: boolean;
  defaultValue?: number;
};

export type ManagementTableFilterProps = filter;

export default function ManagementTableFilter(
  props: ManagementTableFilterProps
) {
  return (
    <FormControl display="flex" flex={1} alignItems="center">
      {props.title && (
        <FormLabel whiteSpace={"pre"} margin={1}>
          {props.title}
          {": "}
        </FormLabel>
      )}
      <Select
        defaultValue={props.defaultValue}
        onChange={(event) => {
          const value = event.target.value;
          props.onFilterChange({
            index: value === "" ? undefined : Number(value),
          });
        }}
        placeholder={props.allowNull ? "전체" : undefined}
        fontWeight={"bold"}
      >
        {props.data.map((tab, index) => (
          <option key={index} value={index}>
            {tab}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
