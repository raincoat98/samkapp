import { useState, useRef, useEffect } from "react";
import {
  useDisclosure,
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
  const popoverDisclosure = useDisclosure();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let dataList = [...props.enumList];
  let defaultValueIndex: number | undefined;
  const key = props.displayKey ?? props.searchKey;

  const [valueIndex, setValueIndex] = useState<any>();
  useEffect(() => {
    // 기존값 검색
    if (props.defaultValue !== undefined) {
      dataList.find((data, index) => {
        if (data[props.searchKey] === props.defaultValue) {
          setValueIndex(index);
          return true;
        } else return false;
      });
    }
  }, [dataList, defaultValueIndex, props.defaultValue, props.searchKey]);

  // 엘리먼트 ref
  const inputEl = useRef<HTMLInputElement>(null);
  const searchEl = useRef<HTMLInputElement>(null);
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

  const fuseKeys: string[] = [props.searchKey];
  if (props.displayKey) fuseKeys.push(props.displayKey);
  const fuse = new Fuse(dataList, {
    keys: fuseKeys,
  });

  return (
    <FormControl isDisabled={props.isDisabled}>
      {props.enumList.length > 50 ? (
        // 데이터가 50개 이상일 때는 Select를 사용하지 않음 (성능 문제)
        <Popover
          initialFocusRef={searchEl}
          isOpen={popoverDisclosure.isOpen}
          onClose={popoverDisclosure.onClose}
        >
          <PopoverTrigger>
            <HStack>
              <Input
                ref={inputEl}
                onClick={popoverDisclosure.onOpen}
                defaultValue={
                  defaultValueIndex !== undefined
                    ? dataList[defaultValueIndex][key]
                    : ""
                }
                isReadOnly={true}
                placeholder="없음"
                cursor="pointer"
              />

              <IconButton
                onClick={popoverDisclosure.onOpen}
                isDisabled={props.isDisabled}
                icon={<Icon as={search} />}
                aria-label="항목 검색"
                title="항목 검색"
              />
            </HStack>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>항목 검색</PopoverHeader>
            <PopoverBody overflow="hidden">
              <Input
                ref={searchEl}
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
                        if (inputEl.current) {
                          inputEl.current.value = fuseData.item[key].toString();
                        }

                        props.onChange(
                          dataList[fuseData.refIndex][props.searchKey]
                        );

                        popoverDisclosure.onClose();
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
      ) : (
        <Select
          ref={selectEl}
          onChange={(event) => {
            const index = Number(event.target.value);
            setValueIndex(index);
            props.onChange(dataList[index][props.searchKey]);
          }}
          value={valueIndex}
          placeholder="없음"
        >
          {dataList.map((enumItem, index) => (
            <option value={index} key={index}>
              {enumItem[key]}
            </option>
          ))}
        </Select>
      )}
    </FormControl>
  );
}
