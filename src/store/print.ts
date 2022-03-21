import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { transfer_out } from "schema/transfer_out";
import { work_order } from "schema/work_order";

export type PrintState = {
  work_order: work_order[];
  transfer_out: transfer_out[];
};

const initialState: PrintState = { work_order: [], transfer_out: [] };

const printSlice = createSlice({
  name: "print",
  initialState,
  reducers: {
    setWorkOrderPrintData(state, action: PayloadAction<work_order[]>) {
      return {
        ...state,
        work_order: [...action.payload],
      };
    },
    setTransferOutPrintData(state, action: PayloadAction<transfer_out[]>) {
      console.log(action);

      return {
        ...state,
        transfer_out: [...action.payload],
      };
    },
  },
});

const { reducer, actions } = printSlice;
export const { setWorkOrderPrintData, setTransferOutPrintData } = actions;
export default reducer;
