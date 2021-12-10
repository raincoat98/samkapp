import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import error_code from "./error_code.json";

import customer from "./database/customer.json";
import group1 from "./database/group1.json";
import group2 from "./database/group2.json";
import inventory from "./database/inventory.json";
import list_price from "./database/list_price.json";
import part_type from "./database/part_type.json";
import part from "./database/part.json";
import transfer_in from "./database/transfer_in.json";
import transfer_out from "./database/transfer_out.json";
import warehouse from "./database/warehouse.json";
import work_order from "./database/work_order.json";

const resources = {
  ko: {
    translation: {
      // 에러 코드
      error_code,

      // 데이터베이스 테이블 번역
      customer,
      group1,
      group2,
      inventory,
      list_price,
      part_type,
      part,
      transfer_in,
      transfer_out,
      warehouse,
      work_order,

      crt_id: "생성자",
      crt_date: "생성일자",
      mod_id: "저장자",
      mod_date: "저장일자",
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
