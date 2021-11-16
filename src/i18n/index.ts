import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import error_code from "./error_code.json";

import tb_customer_mngr from "./database/tb_customer_mngr.json";
import tb_customer from "./database/tb_customer.json";
import tb_inventory from "./database/tb_inventory.json";
import tb_group1 from "./database/tb_group1.json";
import tb_group2 from "./database/tb_group2.json";
import tb_part_list_price from "./database/tb_part_list_price.json";
import tb_part_type from "./database/tb_part_type.json";
import tb_part from "./database/tb_part.json";
import tb_transfer_in from "./database/tb_transfer_in.json";
import tb_transfer_out from "./database/tb_transfer_out.json";
import tb_warehouse from "./database/tb_warehouse.json";
import tb_work_order from "./database/tb_work_order.json";

const resources = {
  ko: {
    translation: {
      // 에러 코드
      error_code,

      // 데이터베이스 테이블 번역
      tb_customer_mngr,
      tb_customer,
      tb_inventory,
      tb_group1,
      tb_group2,
      tb_part_list_price,
      tb_part_type,
      tb_part,
      tb_transfer_in,
      tb_transfer_out,
      tb_warehouse,
      tb_work_order,

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
