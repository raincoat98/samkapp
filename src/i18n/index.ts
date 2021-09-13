import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import error_code from "./error_code.json";
import customer from "./customer.json";
import part_group_1 from "./part_group_1.json";
import part_group_2 from "./part_group_2.json";
import part_price from "./part_price.json";
import part_type from "./part_type.json";
import part from "./part.json";
import warehouse from "./warehouse.json";

const resources = {
  ko: {
    translation: {
      error_code,

      customer,
      part_group_1,
      part_group_2,
      part_price,
      part_type,
      part,
      warehouse,

      Index: "인덱스",
      Search: "검색",
      Select: "선택",
      Add: "추가",
      Delete: "삭제",
      Remove: "제거",
      Cancel: "취소",
      Reset: "초기화",
      Save: "저장",
      Setting: "설정",
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
