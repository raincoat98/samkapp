import * as bson from "bson";

export type part_group_2 = {
  _id: bson.ObjectId;
  code: string;
  create_by?: string;
  create_dttm?: Date;
  name: string;
  owner_id: string;
  part_group_1_id?: part_group_1;
  remark?: string;
  save_by?: string;
  save_dttm?: Date;
  search_group?: string;
  sort_seq?: number;
  valid?: boolean;
};

export const part_group_2Schema = {
  name: "part_group_2",
  properties: {
    _id: "objectId",
    code: "string",
    create_by: "string?",
    create_dttm: "date?",
    name: "string",
    owner_id: "string",
    part_group_1_id: "part_group_1",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    search_group: "string?",
    sort_seq: "int?",
    valid: "bool?",
  },
  primaryKey: "_id",
};

export type customer_mngr = {
  _id: bson.ObjectId;
  cell_phone?: string;
  class_position?: string;
  create_by?: string;
  create_dttm?: Date;
  customer_id?: customer;
  email?: string;
  fax?: string;
  name: string;
  namecard?: string;
  owner_id: string;
  remark?: string;
  save_by?: string;
  save_dttm?: Date;
  tel?: string;
};

export const customer_mngrSchema = {
  name: "customer_mngr",
  properties: {
    _id: "objectId",
    cell_phone: "string?",
    class_position: "string?",
    create_by: "string?",
    create_dttm: "date?",
    customer_id: "customer",
    email: "string?",
    fax: "string?",
    name: "string",
    namecard: "string?",
    owner_id: "string",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    tel: "string?",
  },
  primaryKey: "_id",
};

export type part = {
  _id: bson.ObjectId;
  bills_of_material: Array<part_bills_of_material>;
  code: string;
  create_by?: string;
  create_dttm?: Date;
  name: string;
  owner_id: string;
  part_group_2_id?: part_group_2;
  part_spec?: string;
  part_type_id?: part_type;
  remark?: string;
  save_by?: string;
  save_dttm?: Date;
  unit?: string;
  warehouse_id?: warehouse;
};

export const partSchema = {
  name: "part",
  properties: {
    _id: "objectId",
    bills_of_material: "part_bills_of_material[]",
    code: "string",
    create_by: "string?",
    create_dttm: "date?",
    name: "string",
    owner_id: "string",
    part_group_2_id: "part_group_2",
    part_spec: "string?",
    part_type_id: "part_type",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    unit: "string?",
    warehouse_id: "warehouse",
  },
  primaryKey: "_id",
};

export type part_bills_of_material = {
  number: number;
  part_id: bson.ObjectId;
};

export const part_bills_of_materialSchema = {
  name: "part_bills_of_material",
  embedded: true,
  properties: {
    number: "int",
    part_id: "objectId",
  },
};

export type part_group_1 = {
  _id: bson.ObjectId;
  code: string;
  create_by?: string;
  create_dttm?: Date;
  is_material?: number;
  name: string;
  owner_id: string;
  remark?: string;
  save_by?: string;
  save_dttm?: Date;
  sort_seq?: number;
  valid?: boolean;
};

export const part_group_1Schema = {
  name: "part_group_1",
  properties: {
    _id: "objectId",
    code: "string",
    create_by: "string?",
    create_dttm: "date?",
    is_material: "int?",
    name: "string",
    owner_id: "string",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    sort_seq: "int?",
    valid: "bool?",
  },
  primaryKey: "_id",
};

export type warehouse = {
  _id: bson.ObjectId;
  cell_number?: string;
  code: string;
  create_by?: string;
  create_dttm?: Date;
  is_dev?: boolean;
  is_sub?: boolean;
  name: string;
  owner_id: string;
  rack_qty?: string;
  remark?: string;
  row_qty?: string;
  save_by?: string;
  save_dttm?: Date;
  sort_seq?: number;
};

export const warehouseSchema = {
  name: "warehouse",
  properties: {
    _id: "objectId",
    cell_number: "string?",
    code: "string",
    create_by: "string?",
    create_dttm: "date?",
    is_dev: "bool?",
    is_sub: "bool?",
    name: "string",
    owner_id: "string",
    rack_qty: "string?",
    remark: "string?",
    row_qty: "string?",
    save_by: "string?",
    save_dttm: "date?",
    sort_seq: "int?",
  },
  primaryKey: "_id",
};

export type part_price = {
  _id: bson.ObjectId;
  apply_end?: Date;
  apply_start?: Date;
  code: string;
  create_by?: string;
  create_dttm?: Date;
  os_price?: string;
  owner_id: string;
  part_id?: part;
  purchase_price?: string;
  remark?: string;
  save_by?: string;
  save_dttm?: Date;
  selling_price?: string;
};

export const part_priceSchema = {
  name: "part_price",
  properties: {
    _id: "objectId",
    apply_end: "date?",
    apply_start: "date?",
    code: "string",
    create_by: "string?",
    create_dttm: "date?",
    os_price: "string?",
    owner_id: "string",
    part_id: "part",
    purchase_price: "string?",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    selling_price: "string?",
  },
  primaryKey: "_id",
};

export type inv = {
  _id: bson.ObjectId;
  adequate_stock?: number;
  create_by?: string;
  create_dttm?: Date;
  inv_month?: Date;
  inv_qty: number;
  owner_id: string;
  part_id?: part;
  rev_inv_qty?: number;
  save_by?: string;
  save_dttm?: Date;
  warehouse_id?: warehouse;
};

export const invSchema = {
  name: "inv",
  properties: {
    _id: "objectId",
    adequate_stock: "int?",
    create_by: "string?",
    create_dttm: "date?",
    inv_month: "date?",
    inv_qty: "int",
    owner_id: "string",
    part_id: "part",
    rev_inv_qty: "int?",
    save_by: "string?",
    save_dttm: "date?",
    warehouse_id: "warehouse",
  },
  primaryKey: "_id",
};

export type transfer_in = {
  _id: bson.ObjectId;
  code: string;
  create_by?: string;
  create_dttm?: Date;
  outsourcing_amont?: number;
  outsourcing_unit_price?: number;
  owner_id: string;
  part_id?: part;
  purchase_amount?: number;
  quantity?: number;
  save_by?: string;
  save_dttm?: Date;
  transfer_date?: Date;
  trasnfer_type_id?: transfer_type;
  unit_price?: number;
  warehouse_id?: warehouse;
};

export const transfer_inSchema = {
  name: "transfer_in",
  properties: {
    _id: "objectId",
    code: "string",
    create_by: "string?",
    create_dttm: "date?",
    outsourcing_amont: "int?",
    outsourcing_unit_price: "int?",
    owner_id: "string",
    part_id: "part",
    purchase_amount: "int?",
    quantity: "int?",
    save_by: "string?",
    save_dttm: "date?",
    transfer_date: "date?",
    trasnfer_type_id: "transfer_type",
    unit_price: "int?",
    warehouse_id: "warehouse",
  },
  primaryKey: "_id",
};

export type 단위 = {
  _id: bson.ObjectId;
  code: string;
  name: string;
};

export const 단위Schema = {
  name: "단위",
  properties: {
    _id: "objectId",
    code: "string",
    name: "string",
  },
  primaryKey: "_id",
};

export type transfer_type = {
  _id: bson.ObjectId;
  code: string;
  create_by?: string;
  create_dttm?: Date;
  name: string;
  owner_id: string;
  part_id?: bson.ObjectId;
  quantity?: number;
  release_amont?: number;
  remark?: string;
  save_by?: string;
  save_dttm?: Date;
  sort_seq?: number;
  transfer_date?: Date;
  transfer_flag?: number;
  unit_price?: number;
  valid?: boolean;
  warehouse_id?: warehouse;
  work_order_id?: work_order;
};

export const transfer_typeSchema = {
  name: "transfer_type",
  properties: {
    _id: "objectId",
    code: "string",
    create_by: "string?",
    create_dttm: "date?",
    name: "string",
    owner_id: "string",
    part_id: "objectId?",
    quantity: "int?",
    release_amont: "int?",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    sort_seq: "int?",
    transfer_date: "date?",
    transfer_flag: "int?",
    unit_price: "int?",
    valid: "bool?",
    warehouse_id: "warehouse",
    work_order_id: "work_order",
  },
  primaryKey: "_id",
};

export type work_order = {
  _id: bson.ObjectId;
  code: string;
  create_by?: string;
  create_dttm?: Date;
  customer_id?: customer;
  owner_id: string;
  part_id?: part;
  plan_date?: Date;
  plan_qty?: number;
  priorities: string;
  progress?: string;
  remark?: string;
  save_by?: string;
  save_dttm?: Date;
};

export const work_orderSchema = {
  name: "work_order",
  properties: {
    _id: "objectId",
    code: "string",
    create_by: "string?",
    create_dttm: "date?",
    customer_id: "customer",
    owner_id: "string",
    part_id: "part",
    plan_date: "date?",
    plan_qty: "int?",
    priorities: "string",
    progress: "string?",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
  },
  primaryKey: "_id",
};

export type customer = {
  _id: bson.ObjectId;
  address?: address;
  bill_limit_id?: string;
  business_info?: string;
  business_number?: string;
  ceo_name?: string;
  code?: string;
  create_by?: string;
  create_dttm?: Date;
  credit_limit?: string;
  fax?: string;
  homepage?: string;
  name?: string;
  owner_id: string;
  remark?: string;
  save_by?: string;
  save_dttm?: Date;
  tel?: string;
  valid?: boolean;
};

export const customerSchema = {
  name: "customer",
  properties: {
    _id: "objectId",
    address: "address",
    bill_limit_id: "string?",
    business_info: "string?",
    business_number: "string?",
    ceo_name: "string?",
    code: "string?",
    create_by: "string?",
    create_dttm: "date?",
    credit_limit: "string?",
    fax: "string?",
    homepage: "string?",
    name: "string?",
    owner_id: "string",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    tel: "string?",
    valid: "bool?",
  },
  primaryKey: "_id",
};

export type address = {
  address?: string;
  zip_code?: string;
};

export const addressSchema = {
  name: "address",
  embedded: true,
  properties: {
    address: "string?",
    zip_code: "string?",
  },
};

export type part_type = {
  _id: bson.ObjectId;
  code: string;
  create_by?: string;
  create_dttm?: Date;
  is_material?: number;
  name: string;
  owner_id: string;
  remark?: string;
  save_by?: string;
  save_dttm?: Date;
  sort_seq?: number;
  valid?: boolean;
};

export const part_typeSchema = {
  name: "part_type",
  properties: {
    _id: "objectId",
    code: "string",
    create_by: "string?",
    create_dttm: "date?",
    is_material: "int?",
    name: "string",
    owner_id: "string",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    sort_seq: "int?",
    valid: "bool?",
  },
  primaryKey: "_id",
};

export type transfer_out = {
  _id: bson.ObjectId;
  code: string;
  create_by?: string;
  create_dttm?: Date;
  owner_id: string;
  part_id?: part;
  quantity?: number;
  release_amont?: number;
  save_by?: string;
  save_dttm?: Date;
  transfer_date?: Date;
  trasnfer_type_id?: transfer_type;
  unit_price?: number;
  warehouse_id?: warehouse;
  work_order_id?: work_order;
};

export const transfer_outSchema = {
  name: "transfer_out",
  properties: {
    _id: "objectId",
    code: "string",
    create_by: "string?",
    create_dttm: "date?",
    owner_id: "string",
    part_id: "part",
    quantity: "int?",
    release_amont: "int?",
    save_by: "string?",
    save_dttm: "date?",
    transfer_date: "date?",
    trasnfer_type_id: "transfer_type",
    unit_price: "int?",
    warehouse_id: "warehouse",
    work_order_id: "work_order",
  },
  primaryKey: "_id",
};
