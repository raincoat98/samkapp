import { createSlice } from "@reduxjs/toolkit";

import CustomerManage from "../components/CustomerManage";
import Setting from "../components/Setting";
import ToolManage from "../components/ToolManage";
import ProcessManage from "../components/ProcessManage";

type route = {
  id: string;
  title: string;
  path: string;
  component: () => JSX.Element;
  params?: string[];
  container: boolean;
};

export type RouterState = {
  defaultPath: string;
  routes: route[];
};

const initialState: RouterState = {
  defaultPath: "/setting",
  routes: [
    {
      id: "customerManage",
      title: "고객 관리",
      path: "/customer_manage",
      component: CustomerManage,
      container: true,
    },
    {
      id: "setting",
      title: "설정",
      path: "/setting",
      component: Setting,
      container: true,
    },
    {
      id: "toolManage",
      title: "도구 관리",
      path: "/tool_manage",
      component: ToolManage,
      params: ["/:id"],
      container: false,
    },
    {
      id: "processManage",
      title: "공정관리",
      path: "/process_manage",
      component: ProcessManage,
      container: true,
    },
  ],
};

const userSlice = createSlice({
  name: "router",
  initialState,
  reducers: {},
});

const { reducer } = userSlice;
export default reducer;
