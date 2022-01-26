import { useState, useRef } from "react";
import {
  FormControl,
  Select,
  Input,
  HStack,
  IconButton,
  Icon,
  Button,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import Fuse from "fuse.js";
import { search } from "utils/icons";

export default function InputEnum(props: {
  enumList: any[];
  searchKey: string;
  filter?: Record<string, any>;
  displayKey?: string;
  onChange: (selected: any) => void;
  defaultValue?: any;
  isDisabled?: boolean;
}) {
  let dataList = props.enumList;
  let defaultValueIndex: number | undefined;
  const key = props.displayKey ?? props.searchKey;

  // Select 엘리먼트 ref
  const selectEl = useRef<HTMLSelectElement>(null);

  // 선택한 항목의 배열 인덱스
  const [fuseResults, setFuseResults] = useState<Fuse.FuseResult<any>[]>([]);

  // 특정 값인 데이터만 필터링
  for (const filterKey in props.filter) {
    const filterData = props.filter[filterKey];
    dataList = dataList.filter(
      (enumData) => enumData[filterKey] === filterData
    );
  }

  // 기존값 검색
  if (props.defaultValue) {
    dataList.find((data, index) => {
      if (data[props.searchKey] === props.defaultValue) {
        defaultValueIndex = index;
        return true;
      } else return false;
    });
  }

  const fuseKeys: string[] = [props.searchKey];
  if (props.displayKey) fuseKeys.push(props.displayKey);
  const fuse = new Fuse(dataList, {
    keys: fuseKeys,
  });

  return (
    <FormControl isDisabled={props.isDisabled}>
      <HStack>
        <Select
          ref={selectEl}
          onChange={(event) =>
            props.onChange(
              dataList[Number(event.target.value)][props.searchKey]
            )
          }
          defaultValue={defaultValueIndex}
          placeholder="없음"
        >
          {dataList.map((enumItem, index) => (
            <option value={index} key={index}>
              {enumItem[key]}
            </option>
          ))}
        </Select>

        {/* 검색 영역 */}
        <Popover>
          <PopoverTrigger>
            <IconButton
              isDisabled={props.isDisabled}
              icon={<Icon as={search} />}
              aria-label="항목 검색"
              title="항목 검색"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>항목 검색</PopoverHeader>
            <PopoverBody overflow="hidden">
              <Input
                placeholder="검색어를 입력해주세요."
                onChange={(event) => {
                  window.setTimeout(() => {
                    setFuseResults(fuse.search(event.target.value));
                  }, 200);
                }}
              />

              {fuseResults.length !== 0 && (
                <VStack maxH={200} mt={2} p={1} overflow="auto">
                  {fuseResults.map((fuseData, index) => (
                    <Button
                      onClick={() => {
                        if (selectEl.current) {
                          selectEl.current.value = fuseData.refIndex.toString();
                          props.onChange(
                            dataList[fuseData.refIndex][props.searchKey]
                          );
                        }
                      }}
                      w="100%"
                      p={1}
                      key={index}
                    >
                      {fuseData.item[key]}
                    </Button>
                  ))}
                </VStack>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </FormControl>
  );
}
