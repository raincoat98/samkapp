import { createSlice } from "@reduxjs/toolkit";

import CustomerManage from "../components/MasterDataManagement/CustomerManage";
import Setting from "../components/Setting";
import ToolManage from "../components/ToolManagement/ToolManage";
import ProcessManage from "../components/Monitoring/ProcessManage";
import Announcement from "../components/SystemManagement/Announcement";

type route = {
  id: string;
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
    // 기준정보 관리
    {
      id: "Customer Management",
      path: "/customer_manage",
      component: CustomerManage,
      container: false,
    },

    // 도구 관리
    {
      id: "Tool Management",
      path: "/tool_manage",
      component: ToolManage,
      params: ["/:id"],
      container: false,
    },
    {
      id: "Wooden Management",
      path: "/tool_manage/wooden",
      component: ToolManage,
      container: false,
    },
    {
      id: "Stash Management",
      path: "/tool_manage/stash",
      component: ToolManage,
      container: false,
    },
    {
      id: "Typesetting Paper Management",
      path: "/tool_manage/typesetting_paper",
      component: ToolManage,
      container: false,
    },
    {
      id: "Typesetting Paper Hanger Management",
      path: "/tool_manage/typesetting_paper_hanger",
      component: ToolManage,
      container: false,
    },

    // 모니터링
    {
      id: "Process Management",
      path: "/process_manage",
      component: ProcessManage,
      container: true,
    },

    // 시스템 관리
    {
      id: "Announcement",
      path: "/announcement",
      component: Announcement,
      container: false,
    },

    // 설정
    {
      id: "Setting",
      path: "/setting",
      component: Setting,
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
