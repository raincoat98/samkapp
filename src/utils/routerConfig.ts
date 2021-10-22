import CustomerMngrManagement from "pages/CustomerMngrManagement";
import CustomerManagement from "pages/CustomerManagement";
import InvManagement from "pages/InvManagement";
import PartManagement from "pages/PartManagement";
import PartGroup1Management from "pages/PartGroup1Management";
import PartGroup2Management from "pages/PartGroup2Management";
import PartTypeManagement from "pages/PartTypeManagement";
import PartPriceManagement from "pages/PartPriceManagement";
import WarehouseManagement from "pages/WarehouseManagement";
import WorkOrderManagement from "pages/WorkOrderManagement";

import Announcement from "pages/SystemManagement/Announcement";
import Setting from "pages/Setting";

export type route = {
  name: string;
  path: string;
  component: () => JSX.Element;
  params?: string[];
};

export const routes: Record<string, route> = {
  // 거래처 관리
  customer_manage: {
    name: "거래처 관리",
    path: "/customer_manage",
    component: CustomerManagement,
  },

  // 거래처 담당자 관리
  customer_mngr_manage: {
    name: "거래처 담당자 관리",
    path: "/customer_mngr_manage",
    component: CustomerMngrManagement,
  },

  // 재고 관리
  inv_management: {
    name: "재고 관리",
    path: "/inv_management",
    component: InvManagement,
  },

  // 작업 지시 관리
  work_order_manage: {
    name: "작업 지시 관리",
    path: "/work_order_manage",
    component: WorkOrderManagement,
  },

  // 위치 관리
  warehouse_manage: {
    name: "창고 관리",
    path: "/warehouse_manage",
    component: WarehouseManagement,
  },

  // 품목 관리
  part_manage: {
    name: "품목 관리",
    path: "/part_manage",
    component: PartManagement,
  },
  part_gorup_1_manage: {
    name: "중분류 관리",
    path: "/part_gorup_1_manage",
    component: PartGroup1Management,
  },
  part_gorup_2_manage: {
    name: "대분류 관리",
    path: "/part_gorup_2_manage",
    component: PartGroup2Management,
  },
  part_type_manage: {
    name: "품목 형태 관리",
    path: "/part_type_manage",
    component: PartTypeManagement,
  },
  part_price_manage: {
    name: "품목 가격 관리",
    path: "/part_price_manage",
    component: PartPriceManagement,
  },

  // 시스템 관리
  announcement: {
    name: "시스템 관리",
    path: "/announcement",
    component: Announcement,
  },

  // 설정
  setting: {
    name: "설정",
    path: "/setting",
    component: Setting,
  },
};

const routerConfig: {
  defaultPath: string;
  routes: Record<string, route>;
} = {
  defaultPath: "/setting",
  routes,
};

export type sidebarRouteType = {
  name: string;
  route?: route;
  children?: sidebarRouteType[];
};
export const sidebarConfig: sidebarRouteType[] = [
  { name: "거래처 관리", route: routes.customer_manage },
  { name: "거래처 담당자 관리", route: routes.customer_mngr_manage },
  { name: "재고 관리", route: routes.inv_management },
  { name: "작업 지시 관리", route: routes.work_order_manage },
  { name: "창고 관리", route: routes.warehouse_manage },
  { name: "품목 관리", route: routes.part_manage },
  {
    name: "분류 관리",
    children: [
      {
        name: "중분류 관리",
        route: routes.part_gorup_2_manage,
      },
      {
        name: "대분류 관리",
        route: routes.part_gorup_1_manage,
      },
    ],
  },
  { name: "품목 형태 관리", route: routes.part_type_manage },
  { name: "품목 가격 관리", route: routes.part_price_manage },
  { name: "시스템 관리", route: routes.announcement },
];

export default routerConfig;
