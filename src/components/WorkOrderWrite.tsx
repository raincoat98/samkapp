import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function WorkOrderWrite() {
  const dispatch = useDispatch();
  const workOrderList = useSelector(
    (state: RootState) => state.workOrder.workOrderList
  );

  return (
    <Box>
      <FormControl id="company-name" isRequired>
        <FormLabel>거래처</FormLabel>
        <Input placeholder="거래처" />
      </FormControl>
      <FormControl id="product-name" isRequired>
        <FormLabel>품명</FormLabel>
        <Input placeholder="품명" />
      </FormControl>
      <FormControl id="product-color" isRequired>
        <FormLabel>칼라</FormLabel>
        <Input placeholder="칼라" />
      </FormControl>
      <FormControl id="product-type" isRequired>
        <FormLabel>지종</FormLabel>
        <Input placeholder="지종" />
      </FormControl>
      <FormControl id="quantity" isRequired>
        <FormLabel>수량</FormLabel>
        <Input placeholder="수량" />
      </FormControl>
    </Box>
  );
}
