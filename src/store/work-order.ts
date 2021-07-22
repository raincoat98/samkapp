import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  workOrderSelected: workOrder;
  workOrderList: workOrder[];
};

const initialState: WorkOrderState = {
  workOrderSelected: {
    id: "",
    companyName: "",
    productName: "",
    productColor: "",
    productType: "",
    quantity: 0,
    dueDate: new Date(),
  },
  workOrderList: [],
};

const workOrderSlice = createSlice({
  name: "work-order",
  initialState,
  reducers: {
    selectWorkOrder(state, action: PayloadAction<string>) {
      for (let index = 0; index < state.workOrderList.length; index++) {
        if (action.payload === state.workOrderList[index].id) {
          state.workOrderSelected = state.workOrderList[index];
          return;
        }
      }
    },
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
    getWorkOrderById(state, action) {
      return {
        ...state,
        workOrder: state.workOrderList.filter(
          (workOrder) => workOrder.id === action.payload
        ),
      };
    },
  },
});

const { reducer, actions } = workOrderSlice;
export const { selectWorkOrder, addWorkOrder, deleteWorkOrder } = actions;
export default reducer;
