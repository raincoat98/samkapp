import { createSlice } from "@reduxjs/toolkit";

import ClientManage from "../components/ClientManage";
import Setting from "../components/Setting";

type route = {
  id: string;
  title: string;
  path: string;
  component: () => JSX.Element;
};

export type RouterState = {
  default: string;
  routes: route[];
};

const initialState: RouterState = {
  default: "/client_manage",
  routes: [
    {
      id: "clientManage",
      title: "거래처 관리",
      path: "/client_manage",
      component: ClientManage,
    },
    {
      id: "setting",
      title: "설정",
      path: "/setting",
      component: Setting,
    },
  ],

  // operateCondition: {
  //   title: "설비 가동 상황",
  //   path: "/operate_condition",
  // },
  // workCondition: {
  //   title: "작업 현황",
  //   path: "/work_condition",
  // },
  // workOrderList: {
  //   title: "작업 지시서",
  //   path: "/work_order_list",
  // },
  // lineCondition: {
  //   title: "라인 현황",
  //   path: "/line_condition",
  // },
};

const userSlice = createSlice({
  name: "router",
  initialState,
  reducers: {},
});

const { reducer } = userSlice;
export default reducer;
