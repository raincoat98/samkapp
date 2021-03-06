import { schemaType } from "./index";

export type customer = {
  customer_id: number;
  customer_name: string;
  business_number?: string;
  ceo_name: string;
  tel?: string;
  fax?: string;
  zip_code: string;
  address: string;
  business_info?: string;
  item_info?: string;
  homepage?: string;
  remark?: string;
};

export const customerSchema: schemaType = {
  name: "customer",
  properties: {
    customer_id: {
      type: "number",
      isPrimary: true,
      isAutoSet: true,
      isNotNull: true,
      isNotVisible: true,
    },
    customer_name: {
      type: "string",
      isNotNull: true,
    },
    business_number: {
      type: "string",
      isDisalbePreview: true,
    },
    ceo_name: {
      type: "string",
      isNotNull: true,
    },
    tel: {
      type: "string",
      isNotNull: true,
    },
    fax: {
      type: "string",
    },
    zip_code: {
      type: "string",
      isNotNull: true,
      isDisalbePreview: true,
    },
    address: {
      type: "string",
      isNotNull: true,
      isDisalbePreview: true,
    },
    business_info: {
      type: "string",
    },
    item_info: {
      type: "string",
    },
    homepage: {
      type: "string",
      isDisalbePreview: true,
    },
    remark: {
      type: "string",
    },
  },
};
