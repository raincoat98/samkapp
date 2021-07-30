import { createSlice } from "@reduxjs/toolkit";

import ClientManage from "../components/ClientManage";
import Setting from "../components/Setting";
import ToolManage from "../components/ToolManage";

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
  defaultPath: "/client_manage",
  routes: [
    {
      id: "clientManage",
      title: "거래처 관리",
      path: "/client_manage",
      component: ClientManage,
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
  ],
};

const userSlice = createSlice({
  name: "router",
  initialState,
  reducers: {},
});

const { reducer } = userSlice;
export default reducer;
