import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type workOrder = {
  id: string;
  companyName: string;
  productName: string;
  productColor: string;
  productType: string;
  quantity: number;
  dueDate: Date;
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
      if (!workOrder.payload.id) workOrder.payload.id = uuidv4();
      state.workOrderList.push(workOrder.payload);
    },
    deleteWorkOrder(state, workOrder) {
      state.workOrderList.push(workOrder.payload);
    },
    deleteAllWorkOrder(state) {
      state.workOrderList = [];
    },
  },
});

const { reducer, actions } = userSlice;
export const { addWorkOrder, deleteWorkOrder } = actions;
export default reducer;
