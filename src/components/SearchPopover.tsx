import React from "react";
import Fuse from "fuse.js";
import { search } from "utils/icons";
import {
  Box,
  Stack,
  Icon,
  IconButton,
  Input,
  Popover,
  PopoverProps,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export default function SearchPopover(props: {
  popoverProps?: PopoverProps;
  data: any[];
  searchKeys: string[];
  onSelect: (selected: Fuse.FuseResult<any>) => void;
}) {
  const [searchResults, setSearchResults] = React.useState<
    Fuse.FuseResult<any>[]
  >([]);
  const fuse = new Fuse(props.data, {
    keys: props.searchKeys,
    includeScore: true,
  });

  console.log(searchResults);

  return (
    <Popover {...props.popoverProps}>
      <PopoverTrigger>
        <IconButton
          icon={<Icon as={search} />}
          aria-label="검색하기"
          marginLeft={1}
        />
      </PopoverTrigger>
      <PopoverContent boxShadow="md">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>검색</PopoverHeader>
        <PopoverBody>
          <Input
            onChange={(event) =>
              setSearchResults(fuse.search(event.target.value))
            }
          />
          <Stack direction="column" marginTop={3}>
            <ButtonGroup size="sm" variant="outline" colorScheme="teal">
              {searchResults.map((searchResult, index) => (
                <Button
                  onClick={() => props.onSelect(searchResults[index])}
                  flex="1"
                  key={index}
                >
                  <Box>
                    {`[${searchResult.item["code"]}]: ` +
                      `${searchResult.item["name"]}`}
                  </Box>
                  <Box>{}</Box>
                </Button>
              ))}
            </ButtonGroup>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
