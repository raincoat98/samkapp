export type customer = {
  _id: string;
  address?: string;
  bill_limit_id?: string;
  business_info?: string;
  business_number?: string;
  ceo_name?: string;
  create_by?: string;
  create_dttm?: Date;
  credit_limit?: string;
  customer_group_id?: string;
  customer_name: string;
  fax?: string;
  homepage?: string;
  owner_id: string;
  remark?: string;
  save_by?: string;
  save_dttm?: Date;
  tel?: string;
  valid?: boolean;
  zip_code?: number;
};

export const customerSchema = {
  name: "customer",
  properties: {
    _id: "string",
    address: "string?",
    bill_limit_id: "string?",
    business_info: "string?",
    business_number: "string?",
    ceo_name: "string?",
    create_by: "string?",
    create_dttm: "date?",
    credit_limit: "string?",
    customer_group_id: "string?",
    customer_name: "string",
    fax: "string?",
    homepage: "string?",
    owner_id: "string",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    tel: "string?",
    valid: "bool?",
    zip_code: "int?",
  },
  primaryKey: "_id",
};

export type part = {
  _id: string;
  create_by?: string;
  create_dttm?: Date;
  owner_id: string;
  part_group_2_id?: part_group_2;
  part_name: string;
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
    _id: "string",
    create_by: "string?",
    create_dttm: "date?",
    owner_id: "string",
    part_group_2_id: "part_group_2",
    part_name: "string",
    part_type_id: "part_type",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    unit: "string?",
    warehouse_id: "warehouse",
  },
  primaryKey: "_id",
};

export type part_group_1 = {
  _id: string;
  create_by?: string;
  create_dttm?: Date;
  is_material?: number;
  owner_id: string;
  part_group_1_name: string;
  remark?: string;
  save_by?: string;
  save_dttm?: Date;
  sort_seq?: number;
  valid?: boolean;
};

export const part_group_1Schema = {
  name: "part_group_1",
  properties: {
    _id: "string",
    create_by: "string?",
    create_dttm: "date?",
    is_material: "int?",
    owner_id: "string",
    part_group_1_name: "string",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    sort_seq: "int?",
    valid: "bool?",
  },
  primaryKey: "_id",
};

export type part_group_2 = {
  _id: string;
  create_by?: string;
  create_dttm?: Date;
  owner_id: string;
  part_group_1_id?: part_group_1;
  part_group_2_name: string;
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
    _id: "string",
    create_by: "string?",
    create_dttm: "date?",
    owner_id: "string",
    part_group_1_id: "part_group_1",
    part_group_2_name: "string",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    search_group: "string?",
    sort_seq: "int?",
    valid: "bool?",
  },
  primaryKey: "_id",
};

export type part_price = {
  _id: string;
  apply_end?: Date;
  apply_start?: Date;
  create_by?: string;
  create_dttm?: Date;
  os_price?: string;
  owner_id: string;
  part_id: string;
  purchase_price?: string;
  remark?: string;
  save_by?: string;
  save_dttm?: Date;
  selling_price?: string;
};

export const part_priceSchema = {
  name: "part_price",
  properties: {
    _id: "string",
    apply_end: "date?",
    apply_start: "date?",
    create_by: "string?",
    create_dttm: "date?",
    os_price: "string?",
    owner_id: "string",
    part_id: "string",
    purchase_price: "string?",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    selling_price: "string?",
  },
  primaryKey: "_id",
};

export type part_type = {
  _id: string;
  create_by?: string;
  create_dttm?: Date;
  is_material?: number;
  owner_id: string;
  part_type_name: string;
  remark?: string;
  save_by?: string;
  save_dttm?: Date;
  sort_seq?: number;
  valid?: boolean;
};

export const part_typeSchema = {
  name: "part_type",
  properties: {
    _id: "string",
    create_by: "string?",
    create_dttm: "date?",
    is_material: "int?",
    owner_id: "string",
    part_type_name: "string",
    remark: "string?",
    save_by: "string?",
    save_dttm: "date?",
    sort_seq: "int?",
    valid: "bool?",
  },
  primaryKey: "_id",
};

export type warehouse = {
  _id: string;
  cell_number?: string;
  create_by?: string;
  create_dttm?: Date;
  is_dev?: boolean;
  is_sub?: boolean;
  owner_id: string;
  rack_qty?: string;
  remark?: string;
  row_qty?: string;
  save_by?: string;
  save_dttm?: Date;
  sort_seq?: number;
  warehouse_name: string;
};

export const warehouseSchema = {
  name: "warehouse",
  properties: {
    _id: "string",
    cell_number: "string?",
    create_by: "string?",
    create_dttm: "date?",
    is_dev: "bool?",
    is_sub: "bool?",
    owner_id: "string",
    rack_qty: "string?",
    remark: "string?",
    row_qty: "string?",
    save_by: "string?",
    save_dttm: "date?",
    sort_seq: "int?",
    warehouse_name: "string",
  },
  primaryKey: "_id",
};
