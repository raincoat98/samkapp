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
  selected: workOrder;
  workOrderList: workOrder[];
};

const initialState: WorkOrderState = {
  selected: {
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
          state.selected = state.workOrderList[index];
          return;
        }
      }
    },
    addWorkOrder(state, action: PayloadAction<workOrder>) {
      if (!action.payload.id) action.payload.id = uuidv4();
      state.workOrderList = [...state.workOrderList, action.payload];
    },
    deleteWorkOrder(state, action: PayloadAction<workOrder>) {},
    deleteAllWorkOrder(state) {
      state.workOrderList = [];
    },
  },
});

const { reducer, actions } = workOrderSlice;
export const { selectWorkOrder, addWorkOrder, deleteWorkOrder } = actions;
export default reducer;
