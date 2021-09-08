import React from "react";
import { useTranslation } from "react-i18next";
import { useAsyncDebounce } from "react-table";
import { search } from "utils/icons";
import { Icon, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";

export default function TableSearch(props: {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
}) {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(props.globalFilter);
  const onChange = useAsyncDebounce((value) => {
    props.setGlobalFilter(value || undefined);
  }, 200);

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={<Icon as={search} />} />
      <Input
        value={value || ""}
        onChange={(event) => {
          setValue(event.target.value);
          onChange(event.target.value);
        }}
        placeholder={t("Search")}
      />
    </InputGroup>
  );
}
