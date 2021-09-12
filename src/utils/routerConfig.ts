import CustomerManagement from "pages/CustomerManagement";
import PartManagement from "pages/PartManagement";
import PartGroup1Management from "pages/PartGroup1Management";
import PartGroup2Management from "pages/PartGroup2Management";
import PartTypeManagement from "pages/PartTypeManagement";
import PartPriceManagement from "pages/PartPriceManagement";
import WarehouseManagement from "pages/WarehouseManagement";

import Announcement from "pages/SystemManagement/Announcement";
import Setting from "pages/Setting";

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

const routerConfig = {
  defaultPath: "/setting",
  routes: [
    // 고객 관리
    {
      name: "고객 관리",
      path: "/customer_manage",
      component: CustomerManagement,
      sidebar: true,
    },

    // 위치 관리
    {
      name: "창고 관리",
      path: "/warehouse_manage",
      component: WarehouseManagement,
      sidebar: true,
    },

    // 품목 관리
    {
      name: "품목 관리",
      path: "/part_manage",
      component: PartManagement,
      sidebar: true,
    },
    {
      name: "중분류 관리",
      path: "/part_gorup_1_manage",
      component: PartGroup1Management,
      sidebar: true,
    },
    {
      name: "대분류 관리",
      path: "/part_gorup_2_manage",
      component: PartGroup2Management,
      sidebar: true,
    },
    {
      name: "품목 형태 관리",
      path: "/part_type_manage",
      component: PartTypeManagement,
      sidebar: true,
    },
    {
      name: "품목 가격 관리",
      path: "/part_price_manage",
      component: PartPriceManagement,
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

export default routerConfig;