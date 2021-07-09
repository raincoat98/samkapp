import { createSlice } from "@reduxjs/toolkit";

type workOrder = {
  companyName: string;
  productName: string;
  productColor: string;
  productType: string;
  quantity: number;
};

export type WorkOrderState = {
  workOrderList: workOrder[];
};

const initialState: WorkOrderState = {
  workOrderList: [],
};

const userSlice = createSlice({
  name: "work-order",
  initialState,
  reducers: {
    addWorkOrder(state, workOrder) {
      state.workOrderList.push(workOrder.payload);
    },
  },
});

const { reducer, actions } = userSlice;
export const { addWorkOrder } = actions;
export default reducer;
