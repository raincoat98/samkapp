import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type customer = {
  companyName: string;
  managerName: string;
  contact: string;
  fax: string;
  address: number;
};

type vendor = customer;

export type databaseState = {
  customer: customer[];
  vendor: vendor[];
};

const initialState: databaseState = {
  customer: [],
  vendor: [],
};

const workOrderSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    addCustomer(state, action: PayloadAction<customer>) {
      state.customer = [...state.customer, action.payload];
    },
    addVendor(state, action: PayloadAction<customer>) {
      state.vendor = [...state.vendor, action.payload];
    },
  },
});

const { reducer, actions } = workOrderSlice;
export const { addCustomer } = actions;
export default reducer;
