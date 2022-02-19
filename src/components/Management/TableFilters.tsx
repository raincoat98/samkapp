import { Select, HStack, FormControl, FormLabel } from "@chakra-ui/react";

type pageIndex = number | undefined;

export type filter = {
  title: string;
  data: string[];
  onFilterChange: (props: { index: pageIndex }) => void;
  allowNull?: boolean;
  defaultValue?: number;
};

export type ManagementTableFiltersProps = {
  filters: filter[];
};

export default function ManagementTableFilters(
  props: ManagementTableFiltersProps
) {
  const { filters } = props;

  return (
    <HStack padding={1} spacing={1}>
      {filters.map((filter, index) => {
        return (
          <FormControl display="flex" flex={1} alignItems="center" key={index}>
            {filter.title && (
              <FormLabel whiteSpace={"pre"} margin={1}>
                {filter.title}
                {": "}
              </FormLabel>
            )}
            <Select
              defaultValue={filter.defaultValue}
              onChange={(event) => {
                const value = event.target.value;
                filter.onFilterChange({
                  index: value === "" ? undefined : Number(value),
                });
              }}
              placeholder={filter.allowNull ? "전체" : undefined}
              fontWeight={"bold"}
            >
              {filter.data.map((tab, index) => (
                <option key={index} value={index}>
                  {tab}
                </option>
              ))}
            </Select>
          </FormControl>
        );
      })}
    </HStack>
  );
}
