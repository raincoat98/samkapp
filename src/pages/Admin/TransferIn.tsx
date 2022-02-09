import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import moment from "moment";
import {
  Center,
  VStack,
  Button,
  useDisclosure,
  Box,
  Heading,
  Divider,
  HStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import PageContainer from "components/PageContainer";
import Popup from "components/Popup";
import InputFormControl from "components/Input/InputFormControl";
import InputDate from "components/Input/InputDate";
import InputPartId from "components/Input/InputPartId";
import { transfer_in } from "schema/transfer_in";

export default function AdminTransferInView() {
  const database = useSelector((state: RootState) => state.realm.database);

  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [partId, setPartId] = useState<number>();

  const [resultList, setResultList] = useState<transfer_in[]>([]);

  const printPopupState = useDisclosure();

  return (
    <>
      <PageContainer title={"입고현황"}>
        <Center width="100%" height="100%">
          <form
            action=""
            onSubmit={(event) => {
              event.preventDefault();
              const result = database.transfer_in.filter((item) => {
                const transfer_date = moment(item.transfer_date).format(
                  "YYYY-MM-DD"
                );
                const startFilterDate = moment(startDate).format("YYYY-MM-DD");
                const endFilterDate = moment(endDate).format("YYYY-MM-DD");

                // 시작일 검사
                if (
                  startDate &&
                  !moment(startFilterDate).isSameOrBefore(moment(transfer_date))
                )
                  return false;

                // 종료일 검사
                if (
                  endDate &&
                  !moment(endFilterDate).isSameOrAfter(
                    moment(item.transfer_date)
                  )
                )
                  return false;

                // 품목 검사
                if (partId && partId !== item.part_id) return false;
                return true;
              });

              setResultList(result);

              printPopupState.onOpen();
            }}
          >
            <VStack
              minWidth={450}
              maxWidth={500}
              spacing={2}
              textAlign="center"
            >
              <InputFormControl name={"시작일"}>
                <InputDate
                  onChange={(value) => {
                    setStartDate(value);
                  }}
                  isAvailableBeforeToday={true}
                />
              </InputFormControl>

              <InputFormControl name={"종료일"}>
                <InputDate
                  onChange={(value) => {
                    setEndDate(value);
                  }}
                  isAvailableBeforeToday={true}
                />
              </InputFormControl>

              <InputFormControl name={"품목"}>
                <InputPartId
                  onChange={(value) => {
                    setPartId(value);
                  }}
                />
              </InputFormControl>

              <Button type="submit" colorScheme={"blue"}>
                검색
              </Button>
            </VStack>
          </form>
        </Center>
      </PageContainer>

      <Popup
        title={"조회결과"}
        isOpen={printPopupState.isOpen}
        onClose={printPopupState.onClose}
      >
        {resultList.length !== 0 ? (
          <Wrap justify="center">
            {resultList.map((result, index) => (
              <WrapItem key={index}>
                <Card {...result} />
              </WrapItem>
            ))}
          </Wrap>
        ) : (
          "조회된 항목이 존재하지 않습니다."
        )}
      </Popup>
    </>
  );
}

function Card(props: transfer_in) {
  const database = useSelector((state: RootState) => state.realm.database);

  const workOrder = database.work_order.find(
    (item) => item.work_order_id === props.work_order_id
  );
  const customer = database.customer.find(
    (item) => item.customer_id === workOrder?.customer_id
  );
  const part = database.part.find((item) => item.part_id === props.part_id);
  const group = database.group2.find(
    (item) => item.group2_id === part?.group2_id
  );

  return (
    <Box padding={2} borderWidth={2}>
      <Heading size={"md"}>
        #{props.work_order_id} Order No. {workOrder?.work_order_number}
      </Heading>
      <HStack>
        <Box>{moment(props.transfer_date).format("YYYY-MM-DD")}</Box>
        <Box>{customer?.customer_name}</Box>
      </HStack>

      <Divider marginY={3} />

      {part ? (
        <Box>
          <Heading size={"md"}>품목명: {part.part_name}</Heading>
          {group?.spec1 && (
            <Box>
              {group.spec1}: {part.spec1}
            </Box>
          )}
          {group?.spec2 && (
            <Box>
              {group.spec2}: {part.spec2}
            </Box>
          )}
          {group?.spec3 && (
            <Box>
              {group.spec3}: {part.spec3}
            </Box>
          )}
          {group?.spec4 && (
            <Box>
              {group.spec4}: {part.spec4}
            </Box>
          )}
          {group?.spec5 && (
            <Box>
              {group?.spec5}: {part.spec5}
            </Box>
          )}
        </Box>
      ) : (
        "현재 존재하지 않는 품목입니다."
      )}

      <Divider marginY={3} />

      <Heading size={"md"}>수량: {props.quantity}</Heading>
    </Box>
  );
}
