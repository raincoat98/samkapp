import { createSlice } from "@reduxjs/toolkit";

import CustomerManage from "components/CustomerManage";
import LocationManagement from "components/LocationManagement";
import InventoryManagement from "components/InventoryManagement";
import ItemManagement from "components/ItemManagement";
import Announcement from "components/SystemManagement/Announcement";
import Setting from "components/Setting";

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
    // 고객 관리
    {
      id: "Customer Management",
      path: "/customer_manage",
      component: CustomerManage,
    },

    // 위치 관리
    {
      id: "Location Management",
      path: "/location_manage",
      component: LocationManagement,
    },

    // 재고관리
    {
      id: "Inventory Management",
      path: "/inventory_manage",
      component: InventoryManagement,
    },

    // 품목관리
    {
      id: "Item Management",
      path: "/item_manage",
      component: ItemManagement,
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
