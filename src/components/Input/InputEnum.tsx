import React from "react";
import Fuse from "fuse.js";
import { Box, Wrap, WrapItem, Input, Button } from "@chakra-ui/react";

export default function InputEnum(props: {
  enumList: any[];
  searchKey: string;
  onChange: (selected: Fuse.FuseResult<any>) => void;
}) {
  // 검색 라이브러리
  const fuse = new Fuse(props.enumList, {
    keys: [props.searchKey],
    includeScore: true,
  });

  // 검색어
  const [searchWord, setSearchWord] = React.useState("");

  // 검색 결과
  const [searchResults, setSearchResults] = React.useState<
    Fuse.FuseResult<any>[]
  >([]);

  return (
    <Box>
      <Input
        onChange={(event) => {
          setSearchResults(fuse.search(event.target.value));
          setSearchWord(event.target.value);
        }}
      />
      <Wrap marginTop={2}>
        {searchWord === ""
          ? //  검색어를 입력하지 않았을 때
            props.enumList.map((enumItem, index) => (
              <WrapItem key={index}>
                <Button
                  onClick={() => props.onChange(enumItem[props.searchKey])}
                  size="sm"
                  colorScheme="blue"
                >
                  <Box>{enumItem[props.searchKey]}</Box>
                </Button>
              </WrapItem>
            ))
          : // 검색어를 입력했을 때
            searchResults.map((searchResult, index) => (
              <WrapItem key={index}>
                <Button
                  onClick={() =>
                    props.onChange(searchResult.item[props.searchKey])
                  }
                  size="sm"
                  colorScheme="blue"
                >
                  <Box>{searchResult.item[props.searchKey]}</Box>
                </Button>
              </WrapItem>
            ))}
      </Wrap>
    </Box>
  );
}
