import { schemaType } from "./index";

export type tb_customer = {
  customer_id: string;
  customer_name?: string;
  business_number?: string;
  ceo_name?: string;
  tel?: string;
  fax?: string;
  zip_code?: string;
  address?: string;
  business_info?: string;
  item_info?: string;
  homepage?: string;
  bill_limit_id?: string;
  customer_group_id?: string;
  credit_limit?: number;
  remark?: string;
  use_yn?: boolean;
};

export const tb_customerSchema: schemaType = {
  name: "tb_customer",
  properties: {
    customer_id: {
      type: "string",
      isPrimary: true,
      isNotNull: true,
    },
    customer_name: {
      type: "string",
    },
    business_number: {
      type: "string",
    },
    ceo_name: {
      type: "string",
    },
    tel: {
      type: "string",
    },
    fax: {
      type: "string",
    },
    zip_code: {
      type: "string",
    },
    address: {
      type: "string",
    },
    business_info: {
      type: "string",
    },
    item_info: {
      type: "string",
    },
    homepage: {
      type: "string",
    },
    bill_limit_id: {
      type: "string",
    },
    customer_group_id: {
      type: "string",
    },
    credit_limit: {
      type: "number",
    },
    remark: {
      type: "string",
      isTextarea: true,
    },
    use_yn: {
      type: "boolean",
      default: true,
    },
  },
};
