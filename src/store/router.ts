import { createSlice } from "@reduxjs/toolkit";

export type RouterState = {
  default: string;
  operateCondition: string;
  setting: string;
  workCondition: string;
  workOrderList: string;
};

const initialState: RouterState = {
  default: "/operate_condition",
  operateCondition: "/operate_condition",
  setting: "/setting",
  workCondition: "/work_condition",
  workOrderList: "/work_order_list",
};

const userSlice = createSlice({
  name: "router",
  initialState,
  reducers: {},
});

const { reducer } = userSlice;
export default reducer;
