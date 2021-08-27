import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useAsyncDebounce } from "react-table";
import { Icon, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";

export default function TableSearch(props: {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
}) {
  //검색 아이콘
  const searchIcon = useSelector((state: RootState) => state.icon.search);

  const { t } = useTranslation();
  const [value, setValue] = React.useState(props.globalFilter);
  const onChange = useAsyncDebounce((value) => {
    props.setGlobalFilter(value || undefined);
  }, 200);

  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<Icon as={searchIcon} />}
      />
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
