import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import error_code from "./error_code.json";

import customer from "./database/customer.json";
import inv from "./database/inv.json";
import part_group_1 from "./database/part_group_1.json";
import part_group_2 from "./database/part_group_2.json";
import part_price from "./database/part_price.json";
import part_type from "./database/part_type.json";
import part from "./database/part.json";
import warehouse from "./database/warehouse.json";
import work_order from "./database/work_order.json";
import work_order_priorities from "./database/work_order_priorities.json";

const resources = {
  ko: {
    translation: {
      error_code,

      customer,
      inv,
      part_group_1,
      part_group_2,
      part_price,
      part_type,
      part,
      warehouse,
      work_order,
      work_order_priorities,
    },
  },
};

i18n.use(initReactI18next).init({
  debug: true,
  resources,
  lng: "ko",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
