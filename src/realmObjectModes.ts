import * as bson from "bson";

export type customer = {
  _id: bson.ObjectId;
  _last_modified: Date;
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
  owner_id: string;
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
    owner_id: "string",
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
  owner_id: string;
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
    owner_id: "string",
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
  cell_phone?: string;
  class_position?: string;
  customer_id?: string;
  email?: string;
  fax?: string;
  name?: string;
  owner_id: string;
  tel?: string;
};

export const customer_mngrSchema = {
  name: "customer_mngr",
  properties: {
    _id: "objectId",
    _last_modified: "date",
    cell_phone: "string?",
    class_position: "string?",
    customer_id: "string?",
    email: "string?",
    fax: "string?",
    name: "string?",
    owner_id: "string",
    tel: "string?",
  },
  primaryKey: "_id",
};

export type part = {
  _id: bson.ObjectId;
  create_by?: string;
  create_dttm?: Date;
  loc_id?: loc;
  owner_id: string;
  part_group2_id?: bson.ObjectId;
  part_name: string;
  part_type_id?: bson.ObjectId;
  remark?: string;
  row_stamp?: string;
  save_by?: string;
  save_dttm?: Date;
};

export const partSchema = {
  name: "part",
  properties: {
    _id: "objectId",
    create_by: "string?",
    create_dttm: "date?",
    loc_id: "loc",
    owner_id: "string",
    part_group2_id: "objectId?",
    part_name: "string",
    part_type_id: "objectId?",
    remark: "string?",
    row_stamp: "string?",
    save_by: "string?",
    save_dttm: "date?",
  },
  primaryKey: "_id",
};

export type part_type = {
  _id: bson.ObjectId;
  create_by?: string;
  create_dttm?: Date;
  is_material?: number;
  owner_id: string;
  part_type_name: string;
  remark?: string;
  row_stamp?: string;
  save_by?: string;
  save_dttm?: Date;
  sort_seq?: number;
  valid?: boolean;
};

export const part_typeSchema = {
  name: "part_type",
  properties: {
    _id: "objectId",
    create_by: "string?",
    create_dttm: "date?",
    is_material: "int?",
    owner_id: "string",
    part_type_name: "string",
    remark: "string?",
    row_stamp: "string?",
    save_by: "string?",
    save_dttm: "date?",
    sort_seq: "int?",
    valid: "bool?",
  },
  primaryKey: "_id",
};

export type loc = {
  _id: bson.ObjectId;
  create_by?: string;
  create_dttm?: Date;
  loc_name: string;
  owner_id: string;
  remark?: string;
  row_stamp?: string;
  save_by?: string;
  save_dttm?: Date;
  sort_seq?: number;
};

export const locSchema = {
  name: "loc",
  properties: {
    _id: "objectId",
    create_by: "string?",
    create_dttm: "date?",
    loc_name: "string",
    owner_id: "string",
    remark: "string?",
    row_stamp: "string?",
    save_by: "string?",
    save_dttm: "date?",
    sort_seq: "int?",
  },
  primaryKey: "_id",
};
