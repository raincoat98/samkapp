export type tb_customer = {
  customer_id: string;
  customer_name: string;
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

export const tb_customerSchema = {
  name: "tb_customer",
  properties: {
    customer_id: "string",
    customer_name: "string",
    business_number: "string?",
    ceo_name: "string?",
    tel: "string?",
    fax: "string?",
    zip_code: "string?",
    address: "string?",
    business_info: "string?",
    item_info: "string?",
    homepage: "string?",
    bill_limit_id: "string?",
    customer_group_id: "string?",
    credit_limit: "number?",
    remark: "string?",
    use_yn: "boolean?",
  },
  primaryKey: "customer_id",
};
