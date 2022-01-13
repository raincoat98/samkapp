// 관리 페이지
import CustomerManagement from "pages/Management/CustomerManagement";
import InvManagement from "pages/Management/InvManagement";
import PartManagement from "pages/Management/PartManagement";
import PartGroup2Management from "pages/Management/PartGroup2Management";
import PartTypeManagement from "pages/Management/PartTypeManagement";
import ProdOrderManagement from "pages/Management/ProdOrder";
import TransferIn from "pages/Management/TransferIn";
import TransferOut from "pages/Management/TransferOut";
import PartPriceManagement from "pages/Management/PartPriceManagement";
import WarehouseManagement from "pages/Management/WarehouseManagement";
import WorkOrderManagement from "pages/Management/WorkOrderManagement";

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

  // 재고 현황
  inv_management: {
    name: "재고 현황",
    path: "/inv_management",
    component: InvManagement,
  },

  // 작업 지시 관리
  work_order_manage: {
    name: "작업 지시 관리",
    path: "/work_order_manage",
    component: WorkOrderManagement,
  },

  // 입출고 관리
  transfer_in: {
    name: "입고 관리",
    path: "/transfer_in",
    component: TransferIn,
  },
  transfer_out: {
    name: "출고 관리",
    path: "/transfer_out",
    component: TransferOut,
  },

  prod_order: {
    name: "생산지시 관리",
    path: "/prod_manage",
    component: ProdOrderManagement,
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

  part_gorup_2_manage: {
    name: "중분류 관리",
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
  defaultPath: "/work_order_manage",
  routes,
};

export type sidebarRouteType = {
  name: string;
  route?: route;
  children?: sidebarRouteType[];
};
export const sidebarConfig: sidebarRouteType[] = [
  { name: "재고 현황", route: routes.inv_management },
  { name: "입고 관리", route: routes.transfer_in },
  { name: "출고 관리", route: routes.transfer_out },
  { name: "생산 지시 관리", route: routes.prod_order },
  { name: "작업 지시 관리", route: routes.work_order_manage },
  {
    name: "마스터 관리",
    children: [
      { name: "거래처 관리", route: routes.customer_manage },
      { name: "품목 관리", route: routes.part_manage },
      { name: "품목 가격 관리", route: routes.part_price_manage },
      { name: "품목 형태 관리", route: routes.part_type_manage },
      {
        name: "품목 분류 관리",
        route: routes.part_gorup_2_manage,
      },
      { name: "창고 관리", route: routes.warehouse_manage },
    ],
  },
];

export default routerConfig;
