import { useSelector } from "react-redux";
import { RootState } from "store";
import moment from "moment";
import { Box, Heading, Divider, HStack, Badge } from "@chakra-ui/react";
import { work_order } from "schema/work_order";

export default function WorkOrderCard(props: {
  workOrder: work_order;
  index: number;
}) {
  const { workOrder, index } = props;

  const database = useSelector((state: RootState) => state.realm.database);

  const customer = database.customer.find(
    (item) => item.customer_id === workOrder?.customer_id
  );
  const part = database.part.find((item) => item.part_id === workOrder.part_id);
  const group = database.group2.find(
    (item) => item.group2_id === part?.group2_id
  );
  const transferType = database.transfer_type.find(
    (item) => item.transfer_type_id === workOrder.transfer_type_id
  );

  return (
    <Box width="100%" padding={2} borderWidth={2}>
      <Badge padding={1}>
        <Heading size={"md"}>
          #{index} {transferType && transferType.transfer_type_name}
        </Heading>
      </Badge>
      <Heading size={"sm"}>Order No. {workOrder?.work_order_number}</Heading>
      <HStack>
        <Box>{moment(workOrder.transfer_date).format("YYYY-MM-DD")}</Box>
        <Box>{customer?.customer_name}</Box>
      </HStack>

      <Divider marginY={2} />

      {part ? (
        <Box>
          <Heading size={"sm"}>품목명: {part.part_name}</Heading>
          <HStack>
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
          </HStack>
        </Box>
      ) : (
        "현재 존재하지 않는 품목입니다."
      )}

      <Divider marginY={2} />

      <Heading size={"md"}>수량: {workOrder.quantity}</Heading>
    </Box>
  );
}
