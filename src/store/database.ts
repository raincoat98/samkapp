import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type customer = {
  companyName: string;
  managerName: string;
  contact: string;
  fax: string;
  address: string;
  id: string;
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
    // 추가
    addCustomer(state, action: PayloadAction<customer>) {
      const customer = Object.assign({}, action.payload);
      customer.id = uuidv4();
      state.customer = [...state.customer, customer];
    },
    addVendor(state, action: PayloadAction<vendor>) {
      const vendor = Object.assign({}, action.payload);
      vendor.id = uuidv4();
      state.vendor = [...state.vendor, vendor];
    },

    // 삭제
    deleteCustomer(state, action: PayloadAction<customer["id"]>) {
      state.customer = state.customer.filter(
        (customerObject) => customerObject.id !== action.payload
      );
    },
    deleteVendor(state, action: PayloadAction<vendor["id"]>) {
      state.vendor = state.vendor.filter(
        (vendorObject) => vendorObject.id !== action.payload
      );
    },
  },
});

const { reducer, actions } = workOrderSlice;
export const { addCustomer, addVendor, deleteCustomer, deleteVendor } = actions;
export default reducer;
