import { createSlice } from "@reduxjs/toolkit";

export type RouterState = {
  default: string;
  home: string;
  setting: string;
  WorkCondition: string;
  WorkOrderList: string;
};

const initialState: RouterState = {
  default: "/",
  home: "/home",
  setting: "/setting",
  WorkCondition: "/work_condition",
  WorkOrderList: "/work_order_list",
};

const userSlice = createSlice({
  name: "router",
  initialState,
  reducers: {},
});

const { reducer } = userSlice;
export default reducer;
