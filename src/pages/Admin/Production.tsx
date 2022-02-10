import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import moment from "moment";
import { Center, VStack, Button, useDisclosure } from "@chakra-ui/react";
import PageContainer from "components/PageContainer";
import Popup from "components/Popup";
import InputFormControl from "components/Input/InputFormControl";
import InputDate from "components/Input/InputDate";
import InputPartId from "components/Input/InputPartId";
import { product_order } from "schema/product_order";
import WorkOrderCard from "../../components/Card/WorkOrderCard";

export default function AdminProductionView() {
  const database = useSelector((state: RootState) => state.realm.database);

  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [partId, setPartId] = useState<number>();

  const [resultList, setResultList] = useState<product_order[]>([]);

  const printPopupState = useDisclosure();

  return (
    <>
      <PageContainer title={"생산현황"}>
        <Center width="100%" height="100%">
          <form
            action=""
            onSubmit={(event) => {
              event.preventDefault();
              const result = database.product_order.filter((item) => {
                // 시작일 검사
                if (
                  startDate &&
                  moment(item.start_dttm).isSameOrAfter(moment(startDate))
                )
                  return false;

                // 종료일 검사
                if (
                  endDate &&
                  moment(item.due_date).isSameOrAfter(moment(endDate))
                )
                  return false;

                // 품목 검사
                if (partId && partId !== item.part_id) return false;
                return true;
              });

              setResultList(result.reverse());

              printPopupState.onOpen();
            }}
          >
            <VStack width="100%" spacing={2} textAlign="center">
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
