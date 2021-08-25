import * as bson from "bson";

export type customer = {
  _id: bson.ObjectId;
  _last_modified: Date;
  _user_id: string;
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
  valid?: boolean;
  zip_code?: number;
};

export const customerSchema = {
  name: "customer",
  properties: {
    _id: "objectId",
    _last_modified: "date",
    _user_id: "string",
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
    valid: "bool?",
    zip_code: "int?",
  },
  primaryKey: "_id",
};

export type product = {
  _id: bson.ObjectId;
  _last_modified: Date;
  _user_id: string;
  product_name: string;
  remark?: string;
  standard?: string;
  stock: number;
  thickness?: string;
  width?: string;
};

export const productSchema = {
  name: "product",
  properties: {
    _id: "objectId",
    _last_modified: "date",
    _user_id: "string",
    product_name: "string",
    remark: "string?",
    standard: "string?",
    stock: "int",
    thickness: "string?",
    width: "string?",
  },
  primaryKey: "_id",
};

export type customer_mngr = {
  _id: bson.ObjectId;
  _last_modified: Date;
  _user_id: string;
  cell_phone?: string;
  class_position?: string;
  customer_id?: string;
  email?: string;
  fax?: string;
  name?: string;
  tel?: string;
};

export const customer_mngrSchema = {
  name: "customer_mngr",
  properties: {
    _id: "objectId",
    _last_modified: "date",
    _user_id: "string",
    cell_phone: "string?",
    class_position: "string?",
    customer_id: "string?",
    email: "string?",
    fax: "string?",
    name: "string?",
    tel: "string?",
  },
  primaryKey: "_id",
};

export type item = {
  _id: bson.ObjectId;
  _last_modified: Date;
  _user_id: string;
  product_name: string;
  remark?: string;
  stock: number;
};

export const itemSchema = {
  name: "item",
  properties: {
    _id: "objectId",
    _last_modified: "date",
    _user_id: "string",
    product_name: "string",
    remark: "string?",
    stock: "int",
  },
  primaryKey: "_id",
};
