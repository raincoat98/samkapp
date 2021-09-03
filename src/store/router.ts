import { createSlice } from "@reduxjs/toolkit";

import CustomerManage from "components/Management/CustomerManage";
import LocationManagement from "components/Management/LocationManagement";
import InventoryManagement from "components/Management/InventoryManagement";
import ItemManagement from "components/Management/ItemManagement";
import Announcement from "components/SystemManagement/Announcement";
import Setting from "components/Setting";

type route = {
  name: string;
  path: string;
  component: () => JSX.Element;
  params?: string[];
  sidebar?: boolean;
};

export type RouterState = {
  defaultPath: string;
  routes: route[];
};

const initialState: RouterState = {
  defaultPath: "/setting",
  routes: [
    // 고객 관리
    {
      name: "고객 관리",
      path: "/customer_manage",
      component: CustomerManage,
      sidebar: true,
    },

    // 위치 관리
    {
      name: "위치 관리",
      path: "/location_manage",
      component: LocationManagement,
      sidebar: true,
    },

    // 재고 관리
    {
      name: "재고 관리",
      path: "/inventory_manage",
      component: InventoryManagement,
      sidebar: true,
    },

    // 품목 관리
    {
      name: "품목 관리",
      path: "/item_manage",
      component: ItemManagement,
      sidebar: true,
    },

    // 시스템 관리
    {
      name: "시스템 관리",
      path: "/announcement",
      component: Announcement,
    },

    // 설정
    {
      name: "설정",
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
