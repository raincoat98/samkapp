import React from "react";
import { useAsyncDebounce } from "react-table";
import { search } from "utils/icons";
import { Icon, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";

export default function TableSearch(props: {
  preGlobalFilteredRows: any[];
  globalFilter: any;
  setGlobalFilter: Function;
}) {
  const [value, setValue] = React.useState(props.globalFilter);
  const onChange = useAsyncDebounce((value) => {
    props.setGlobalFilter(value || undefined);
  }, 200);

  return (
    <InputGroup size={"sm"}>
      <InputLeftElement pointerEvents="none" children={<Icon as={search} />} />
      <Input
        value={value || ""}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
        placeholder="검색"
      />
    </InputGroup>
  );
}
