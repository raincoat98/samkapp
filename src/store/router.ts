import { createSlice } from "@reduxjs/toolkit";

type route = {
  title: string;
  path: string;
};

export type RouterState = {
  clientManage: route;

  default: route;
  operateCondition: route;
  setting: route;
  workCondition: route;
  workOrderList: route;
  lineCondition: route;
};

const initialState: RouterState = {
  default: {
    title: "거래처 관리",
    path: "/client_manage",
  },
  clientManage: {
    title: "거래처 관리",
    path: "/client_manage",
  },

  operateCondition: {
    title: "설비 가동 상황",
    path: "/operate_condition",
  },
  setting: { title: "설정", path: "/setting" },
  workCondition: {
    title: "작업 현황",
    path: "/work_condition",
  },
  workOrderList: {
    title: "작업 지시서",
    path: "/work_order_list",
  },
  lineCondition: {
    title: "라인 현황",
    path: "/line_condition",
  },
};

const userSlice = createSlice({
  name: "router",
  initialState,
  reducers: {},
});

const { reducer } = userSlice;
export default reducer;
