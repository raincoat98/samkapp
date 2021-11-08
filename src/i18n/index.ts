import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import error_code from "./error_code.json";

import customer_mngr from "./database/customer_mngr.json";
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
import work_order_progress from "./database/work_order_progress.json";

const resources = {
  ko: {
    translation: {
      // 에러 코드
      error_code,

      // 데이터베이스 테이블 번역
      customer_mngr,
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
      work_order_progress,

      crt_id: "생성자",
      crt_date: "생성일자",
      mod_id: "저장자",
      mod_date: "저장일자",

      // 작업지시 우선순위 등급
      emergency: "긴급",
      normal: "보통",
      other: "기타",

      // 작업지시 진행상황
      confirmed: "확인됨",
      shipped: "출고됨",
      producing: "생산중",
      done: "완료됨",
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
