import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import moment from "moment";
import {
  Center,
  VStack,
  HStack,
  Button,
  useDisclosure,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import PageContainer from "components/PageContainer";
import Popup from "components/Popup";
import InputFormControl from "components/Input/InputFormControl";
import { transfer_in } from "schema/transfer_in";
import WorkOrderCard from "../../components/Card/WorkOrderCard";

export default function AdminTransferInView() {
  const database = useSelector((state: RootState) => state.realm.database);

  type viewDateType = "today" | "week" | "month" | "all";
  const [viewDate, setViewDate] = useState<viewDateType>("today");
  const [sorting, setSorting] = useState<"1" | "2">("1");

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

                const date = new Date();

                switch (viewDate) {
                  case "today":
                    date.setDate(date.getDate() - 1);
                    break;
                  case "week":
                    date.setDate(date.getDate() - 7);
                    break;
                  case "month":
                    date.setMonth(date.getMonth() - 1);
                    break;
                  case "all":
                    return true;
                }

                const startFilterDate = moment(date).format("YYYY-MM-DD");

                // 시작일 검사
                if (
                  !moment(startFilterDate).isSameOrBefore(moment(transfer_date))
                )
                  return false;
                else return true;
              });

              if (sorting === "1") setResultList(result);
              else setResultList(result.reverse());

              printPopupState.onOpen();
            }}
          >
            <VStack width="100%" spacing={2} textAlign="center">
              <InputFormControl name={"조회기간"}>
                <RadioGroup
                  value={viewDate}
                  onChange={(value: viewDateType) => {
                    setViewDate(value);
                  }}
                >
                  <HStack spacing={1}>
                    <Radio value="today">오늘</Radio>
                    <Radio value="week">1주일</Radio>
                    <Radio value="month">1개월</Radio>
                    <Radio value="all">전체</Radio>
                  </HStack>
                </RadioGroup>
              </InputFormControl>

              <InputFormControl name={"정렬"}>
                <RadioGroup
                  value={sorting}
                  onChange={(value: "1" | "2") => {
                    setSorting(value);
                  }}
                >
                  <HStack spacing={3}>
                    <Radio value="1">최신순</Radio>
                    <Radio value="2">과거순</Radio>
                  </HStack>
                </RadioGroup>
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
          <VStack width="100%">
            {resultList.map((result, index) => {
              const workOrderData = database.work_order.find(
                (item) => item.work_order_id === result.work_order_id
              );
              if (workOrderData)
                return (
                  <WorkOrderCard
                    workOrder={workOrderData}
                    index={++index}
                    key={index}
                  />
                );
              else return "";
            })}
          </VStack>
        ) : (
          "조회된 항목이 존재하지 않습니다."
        )}
      </Popup>
    </>
  );
}
