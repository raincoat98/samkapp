import React from "react";
import Fuse from "fuse.js";
import { Box, Wrap, WrapItem, Input, Button } from "@chakra-ui/react";

export default function InputEnum(props: {
  enumList: any[];
  searchKey: string;
  displayKey?: string;
  onChange: (selected: Fuse.FuseResult<any>) => void;
  defaultValue?: any;
}) {
  const inputEl = React.useRef<HTMLInputElement>(null);

  const searchKeys: string[] = [props.searchKey];
  if (props.displayKey) searchKeys.push(props.displayKey);

  // 검색 라이브러리
  const fuse = new Fuse(props.enumList, {
    keys: searchKeys,
    includeScore: true,
  });

  // 검색어
  const [searchWord, setSearchWord] = React.useState("");

  // 검색 결과
  const [searchResults, setSearchResults] = React.useState<
    Fuse.FuseResult<any>[]
  >([]);

  // 검색 결과 클릭시
  function onSearchItemClick(searhData: any) {
    if (inputEl.current) inputEl.current.value = searhData;
    props.onChange(searhData);
  }

  return (
    <Box>
      <Input
        onChange={(event) => {
          setSearchResults(fuse.search(event.target.value));
          setSearchWord(event.target.value);
        }}
        defaultValue={props.defaultValue}
        ref={inputEl}
      />
      <Wrap marginTop={2} padding={1} maxHeight={200} overflow="auto">
        {searchWord === ""
          ? //  검색어를 입력하지 않았을 때
            props.enumList.map((enumItem, index) => (
              <WrapItem key={index}>
                <Button
                  onClick={() => onSearchItemClick(enumItem[props.searchKey])}
                  size="sm"
                  colorScheme="blue"
                >
                  <Box>{enumItem[props.displayKey ?? props.searchKey]}</Box>
                </Button>
              </WrapItem>
            ))
          : // 검색어를 입력했을 때
            searchResults.map((searchResult, index) => (
              <WrapItem key={index}>
                <Button
                  onClick={() =>
                    onSearchItemClick(searchResult.item[props.searchKey])
                  }
                  size="sm"
                  colorScheme="blue"
                >
                  <Box>
                    {searchResult.item[props.displayKey ?? props.searchKey]}
                  </Box>
                </Button>
              </WrapItem>
            ))}
      </Wrap>
    </Box>
  );
}
