import * as bson from "bson";

export type customer = {
  _id: bson.ObjectId;
  address?: string;
  bill_limit_id?: string;
  business_info?: string;
  business_number?: string;
  ceo_name?: string;
  credit_limit?: string;
  customer_group_id?: string;
  customer_name: string;
  fax?: string;
  homepage?: string;
  remark?: string;
  tel?: string;
  user_id: string;
  valid?: boolean;
  zip_code?: number;
};

export const customerSchema = {
  name: "customer",
  properties: {
    _id: "objectId",
    address: "string?",
    bill_limit_id: "string?",
    business_info: "string?",
    business_number: "string?",
    ceo_name: "string?",
    credit_limit: "string?",
    customer_group_id: "string?",
    customer_name: "string",
    fax: "string?",
    homepage: "string?",
    remark: "string?",
    tel: "string?",
    user_id: "string",
    valid: "bool?",
    zip_code: "int?",
  },
  primaryKey: "_id",
};

export type product = {
  _id: bson.ObjectId;
  name?: string;
  note?: string;
  standard?: string;
  stock: number;
  thickness?: string;
  user_id: string;
  width?: string;
};

export const productSchema = {
  name: "product",
  properties: {
    _id: "objectId",
    name: "string?",
    note: "string?",
    standard: "string?",
    stock: "int",
    thickness: "string?",
    user_id: "string",
    width: "string?",
  },
  primaryKey: "_id",
};

export type customer_mngr = {
  _id: bson.ObjectId;
  cell_phone?: string;
  class_position?: string;
  customer_id?: string;
  email?: string;
  fax?: string;
  name?: string;
  tel?: string;
  user_id: string;
};

export const customer_mngrSchema = {
  name: "customer_mngr",
  properties: {
    _id: "objectId",
    cell_phone: "string?",
    class_position: "string?",
    customer_id: "string?",
    email: "string?",
    fax: "string?",
    name: "string?",
    tel: "string?",
    user_id: "string",
  },
  primaryKey: "_id",
};
