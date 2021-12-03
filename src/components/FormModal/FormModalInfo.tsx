import { info } from "utils/icons";
import { useTranslation } from "react-i18next";
import Moment from "moment";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Tag,
  Tooltip,
  Flex,
  Text,
  Box,
  Icon,
  IconButton,
} from "@chakra-ui/react";

export type FormModalInfoData = {
  key: string;
  type: string;
  value: any;
};

export default function FormModalInfo(props: {
  dataList: FormModalInfoData[];
}) {
  const { dataList } = props;
  const { t: translate } = useTranslation();
  const sortedDataList = dataList.sort((a, b) => {
    if (a.type === "string") return -1;
    else return 0;
  });

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton icon={<Icon as={info} />} aria-label="기타 정보" />
      </PopoverTrigger>
      <PopoverContent boxShadow="base" width="250px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>기타 정보</PopoverHeader>
        <PopoverBody>
          <Stack>
            {sortedDataList.map((data, index) => {
              const key = translate(data.key);
              let label = "",
                value = "";

              switch (data.type) {
                case "string":
                case "number": {
                  label = data.value;
                  value = data.value;
                  break;
                }
                case "date": {
                  const dateValue: Date = data.value;
                  const duration = Moment.duration(
                    Moment().diff(dateValue)
                  ).asDays();

                  label = Moment(dateValue)
                    .local()
                    .format("YYYY년 MM월 DD일 HH시 mm분");

                  value =
                    duration > 1
                      ? Moment(dateValue).local().format("YYYY-MM-DD")
                      : Moment(dateValue).startOf("minute").fromNow();

                  break;
                }
                default: {
                  console.error("알 수 없는 타입", data);
                  break;
                }
              }

              return (
                <Tooltip label={label} key={index} placement="right">
                  <Flex>
                    <Box marginRight={3}>{key}</Box>
                    <Tag flex="1" justifyContent="center">
                      <Text isTruncated={true} textAlign="center">
                        {value}
                      </Text>
                    </Tag>
                  </Flex>
                </Tooltip>
              );
            })}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
