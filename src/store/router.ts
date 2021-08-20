import { createSlice } from "@reduxjs/toolkit";

import CustomerManage from "components/MasterDataManagement/CustomerManage";
import Setting from "components/Setting";
import InventoryManagement from "components/InventoryManagement";
import ProcessManage from "components/Monitoring/ProcessManage";
import Announcement from "components/SystemManagement/Announcement";

type route = {
  id: string;
  path: string;
  component: () => JSX.Element;
  params?: string[];
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
    },

    // 재고관리
    {
      id: "Inventory Management",
      path: "/inventory_manage",
      component: InventoryManagement,
    },

    // 모니터링
    {
      id: "Process Management",
      path: "/process_manage",
      component: ProcessManage,
    },

    // 시스템 관리
    {
      id: "Announcement",
      path: "/announcement",
      component: Announcement,
    },

    // 설정
    {
      id: "Setting",
      path: "/setting",
      component: Setting,
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
