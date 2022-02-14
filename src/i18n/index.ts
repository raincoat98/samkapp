import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import error from "./error.json";
import { info, use_yn, del_yn } from "./database/common";

import bill_of_materials from "./database/bill_of_materials";
import customer from "./database/customer";
import group2 from "./database/group2";
import inventory from "./database/inventory";
import list_price from "./database/list_price";
import part_type from "./database/part_type";
import part from "./database/part";
import product_order from "./database/product_order";
import transfer_in from "./database/transfer_in";
import transfer_out from "./database/transfer_out";
import transfer_type from "./database/transfer_type";
import unit from "./database/unit";
import warehouse from "./database/warehouse";
import work_order from "./database/work_order";

const resources = {
  ko: {
    translation: {
      // 오류 번역
      error,

      // 데이터베이스 테이블 번역
      bill_of_materials: combine(bill_of_materials),
      customer: combine(customer),
      group2: combine(group2),
      inventory: combine(inventory),
      list_price: combine(list_price),
      part_type: combine(part_type),
      part: combine(part),
      product_order: combine(product_order),
      transfer_in: combine(transfer_in),
      transfer_out: combine(transfer_out),
      warehouse: combine(warehouse),
      transfer_type: combine(transfer_type),
      unit: combine(unit),
      work_order: combine(work_order),
    },
  },
};

function combine(translation: {
  name: string;
  properties: Record<string, string>;
}) {
  return {
    name: translation.name,
    properties: {
      ...translation.properties,
      ...info,
      ...{ use_yn: use_yn, del_yn: del_yn },
    },
  };
}

i18n.use(initReactI18next).init({
  debug: process.env.NODE_ENV === "development",
  resources,
  lng: "ko",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
