import CustomerManage from "components/Management/CustomerManage";
import WarehouseManagement from "components/Management/WarehouseManagement";
import PartManagement from "components/Management/PartManagement";
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

const routerConfig = {
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
