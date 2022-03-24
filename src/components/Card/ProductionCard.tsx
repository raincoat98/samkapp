import { useSelector } from "react-redux";
import { RootState } from "store";
import moment from "moment";
import { Box, Heading, Divider, HStack, Badge } from "@chakra-ui/react";
import { product_order } from "schema/product_order";

export default function ProductionCard(props: {
  productOrder: product_order;
  index: number;
}) {
  const { productOrder, index } = props;

  const database = useSelector((state: RootState) => state.realm.database);

  const part = database.part.find(
    (item) => item.part_id === productOrder.part_id
  );
  const group = database.group2.find(
    (item) => item.group2_id === part?.group2_id
  );

  return (
    <Box width="100%" padding={2} borderWidth={2}>
      <Badge padding={1}>
        <Heading size={"md"}>#{index}</Heading>
      </Badge>
      <Heading size={"sm"}>Order No. {productOrder.prod_order_id}</Heading>
      <HStack>
        <Box>{moment(productOrder.start_dttm).format("YYYY-MM-DD")}</Box>
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

      <Heading size={"md"}>주문수량: {productOrder.order_quantity}</Heading>
    </Box>
  );
}
