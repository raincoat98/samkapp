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
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export default function FormModalInputExternal(props: {
  data: any[];
  keys: string[];
  onSelect: (selected: Fuse.FuseResult<any>) => void;
}) {
  const [searchResults, setSearchResults] = React.useState<
    Fuse.FuseResult<any>[]
  >([]);

  const fuse = new Fuse(props.data, {
    keys: props.keys,
    includeScore: true,
  });

  return (
    <Popover>
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
            {searchResults.map((searchResult, index) => (
              <ButtonGroup
                size="sm"
                variant="outline"
                colorScheme="teal"
                key={index}
              >
                <Button
                  onClick={() => props.onSelect(searchResults[index])}
                  flex="1"
                >
                  {/* 헤더 */}
                  {props.keys.map((key, index) => (
                    <Box key={index}>{searchResult.item[key]}</Box>
                  ))}
                </Button>
              </ButtonGroup>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
