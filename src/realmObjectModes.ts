export type part_group_2 = {
  _id: string;
  code: string;
  crt_id?: string;
  crt_date?: Date;
  name: string;
  owner_id: string;
  part_group_1_id?: string;
  remark?: string;
  mod_id?: string;
  mod_date?: Date;
  search_group?: string;
  sort_seq?: number;
  valid?: boolean;
};

export const part_group_2Schema = {
  name: "part_group_2",
  properties: {
    _id: "string",
    code: "string",
    crt_id: "string?",
    crt_date: "date?",
    name: "string",
    owner_id: "string",
    part_group_1_id: "string",
    remark: "string?",
    mod_id: "string?",
    mod_date: "date?",
    search_group: "string?",
    sort_seq: "int?",
    valid: "bool?",
  },
  primaryKey: "_id",
};

export type customer_mngr = {
  _id: string;
  cell_phone?: string;
  class_position?: string;
  crt_id?: string;
  crt_date?: Date;
  customer_id?: string;
  email?: string;
  fax?: string;
  name: string;
  namecard?: string;
  owner_id: string;
  remark?: string;
  mod_id?: string;
  mod_date?: Date;
  tel?: string;
};

export const customer_mngrSchema = {
  name: "customer_mngr",
  properties: {
    _id: "string",
    cell_phone: "string?",
    class_position: "string?",
    crt_id: "string?",
    crt_date: "date?",
    customer_id: "string",
    email: "string?",
    fax: "string?",
    name: "string",
    namecard: "string?",
    owner_id: "string",
    remark: "string?",
    mod_id: "string?",
    mod_date: "date?",
    tel: "string?",
  },
  primaryKey: "_id",
};

export type part = {
  part_id: number;
  bom_id: number;
  crt_id?: string;
  crt_date?: Date;
  part_name: string;
  part_number: string;
  owner_id: string;
  group2_id?: string;
  part_spec?: string;
  part_type_id?: string;
  remark?: string;
  mod_id?: string;
  mod_date?: Date;
  unit_id?: string;
  warehouse_id?: string;
};

export const partSchema = {
  name: "part",
  properties: {
    part_id: "int",
    bom_id: "number",
    crt_id: "string?",
    crt_date: "date?",
    part_name: "string",
    part_number: "string",
    owner_id: "string",
    group2_id: "string",
    part_spec: "string?",
    part_type_id: "string",
    remark: "string?",
    mod_id: "string?",
    mod_date: "date?",
    unit_id: "string?",
    warehouse_id: "string",
  },
  primaryKey: "part_id",
};

export type part_bills_of_material = {
  number: number;
  part_id: string;
};

export const part_bills_of_materialSchema = {
  name: "part_bills_of_material",
  embedded: true,
  properties: {
    number: "int",
    part_id: "string",
  },
};

export type part_group_1 = {
  _id: string;
  code: string;
  crt_id?: string;
  crt_date?: Date;
  is_material?: number;
  name: string;
  owner_id: string;
  remark?: string;
  mod_id?: string;
  mod_date?: Date;
  sort_seq?: number;
  valid?: boolean;
};

export const part_group_1Schema = {
  name: "part_group_1",
  properties: {
    _id: "string",
    code: "string",
    crt_id: "string?",
    crt_date: "date?",
    is_material: "int?",
    name: "string",
    owner_id: "string",
    remark: "string?",
    mod_id: "string?",
    mod_date: "date?",
    sort_seq: "int?",
    valid: "bool?",
  },
  primaryKey: "_id",
};

export type warehouse = {
  _id: string;
  cell_number?: string;
  code: string;
  crt_id?: string;
  crt_date?: Date;
  is_dev?: boolean;
  is_sub?: boolean;
  name: string;
  owner_id: string;
  rack_qty?: string;
  remark?: string;
  row_qty?: string;
  mod_id?: string;
  mod_date?: Date;
  sort_seq?: number;
};

export const warehouseSchema = {
  name: "warehouse",
  properties: {
    _id: "string",
    cell_number: "string?",
    code: "string",
    crt_id: "string?",
    crt_date: "date?",
    is_dev: "bool?",
    is_sub: "bool?",
    name: "string",
    owner_id: "string",
    rack_qty: "string?",
    remark: "string?",
    row_qty: "string?",
    mod_id: "string?",
    mod_date: "date?",
    sort_seq: "int?",
  },
  primaryKey: "_id",
};

export type part_price = {
  _id: string;
  apply_end?: Date;
  apply_start?: Date;
  code: string;
  crt_id?: string;
  crt_date?: Date;
  os_price?: string;
  owner_id: string;
  part_id?: part;
  purchase_price?: string;
  remark?: string;
  mod_id?: string;
  mod_date?: Date;
  selling_price?: string;
};

export const part_priceSchema = {
  name: "part_price",
  properties: {
    _id: "string",
    apply_end: "date?",
    apply_start: "date?",
    code: "string",
    crt_id: "string?",
    crt_date: "date?",
    os_price: "string?",
    owner_id: "string",
    part_id: "part",
    purchase_price: "string?",
    remark: "string?",
    mod_id: "string?",
    mod_date: "date?",
    selling_price: "string?",
  },
  primaryKey: "_id",
};

export type inv = {
  _id: string;
  adequate_stock?: number;
  crt_id?: string;
  crt_date?: Date;
  inv_month?: Date;
  inv_qty: number;
  owner_id: string;
  part_id?: part;
  rev_inv_qty?: number;
  mod_id?: string;
  mod_date?: Date;
  warehouse_id?: string;
};

export const invSchema = {
  name: "inv",
  properties: {
    _id: "string",
    adequate_stock: "int?",
    crt_id: "string?",
    crt_date: "date?",
    inv_month: "date?",
    inv_qty: "int",
    owner_id: "string",
    part_id: "part",
    rev_inv_qty: "int?",
    mod_id: "string?",
    mod_date: "date?",
    warehouse_id: "string",
  },
  primaryKey: "_id",
};

export type transfer_in = {
  _id: string;
  code: string;
  crt_id?: string;
  crt_date?: Date;
  outsourcing_amont?: number;
  outsourcing_unit_price?: number;
  owner_id: string;
  part_id?: part;
  purchase_amount?: number;
  quantity?: number;
  mod_id?: string;
  mod_date?: Date;
  transfer_date?: Date;
  trasnfer_type_id?: string;
  unit_price?: number;
  warehouse_id?: string;
};

export const transfer_inSchema = {
  name: "transfer_in",
  properties: {
    _id: "string",
    code: "string",
    crt_id: "string?",
    crt_date: "date?",
    outsourcing_amont: "int?",
    outsourcing_unit_price: "int?",
    owner_id: "string",
    part_id: "part",
    purchase_amount: "int?",
    quantity: "int?",
    mod_id: "string?",
    mod_date: "date?",
    transfer_date: "date?",
    trasnfer_type_id: "string",
    unit_price: "int?",
    warehouse_id: "string",
  },
  primaryKey: "_id",
};

export type 단위 = {
  _id: string;
  code: string;
  name: string;
};

export const 단위Schema = {
  name: "단위",
  properties: {
    _id: "string",
    code: "string",
    name: "string",
  },
  primaryKey: "_id",
};

export type transfer_type = {
  _id: string;
  code: string;
  crt_id?: string;
  crt_date?: Date;
  name: string;
  owner_id: string;
  part_id?: string;
  quantity?: number;
  release_amont?: number;
  remark?: string;
  mod_id?: string;
  mod_date?: Date;
  sort_seq?: number;
  transfer_date?: Date;
  transfer_flag?: number;
  unit_price?: number;
  valid?: boolean;
  warehouse_id?: string;
  work_order_id?: string;
};

export const transfer_typeSchema = {
  name: "transfer_type",
  properties: {
    _id: "string",
    code: "string",
    crt_id: "string?",
    crt_date: "date?",
    name: "string",
    owner_id: "string",
    part_id: "string?",
    quantity: "int?",
    release_amont: "int?",
    remark: "string?",
    mod_id: "string?",
    mod_date: "date?",
    sort_seq: "int?",
    transfer_date: "date?",
    transfer_flag: "int?",
    unit_price: "int?",
    valid: "bool?",
    warehouse_id: "string",
    work_order_id: "string",
  },
  primaryKey: "_id",
};

export type work_order = {
  _id: string;
  code: string;
  crt_id?: string;
  crt_date?: Date;
  customer_id?: string;
  owner_id: string;
  part_id?: part;
  plan_date?: Date;
  plan_qty?: number;
  priorities: string;
  progress?: string;
  remark?: string;
  mod_id?: string;
  mod_date?: Date;
};

export const work_orderSchema = {
  name: "work_order",
  properties: {
    _id: "string",
    code: "string",
    crt_id: "string?",
    crt_date: "date?",
    customer_id: "string",
    owner_id: "string",
    part_id: "part",
    plan_date: "date?",
    plan_qty: "int?",
    priorities: "string",
    progress: "string?",
    remark: "string?",
    mod_id: "string?",
    mod_date: "date?",
  },
  primaryKey: "_id",
};

export type customer = {
  _id: string;
  address?: address;
  bill_limit_id?: string;
  business_info?: string;
  business_number?: string;
  ceo_name?: string;
  code?: string;
  crt_id?: string;
  crt_date?: Date;
  credit_limit?: string;
  fax?: string;
  homepage?: string;
  name?: string;
  owner_id: string;
  remark?: string;
  mod_id?: string;
  mod_date?: Date;
  tel?: string;
  valid?: boolean;
};

export const customerSchema = {
  name: "customer",
  properties: {
    _id: "string",
    address: "address",
    bill_limit_id: "string?",
    business_info: "string?",
    business_number: "string?",
    ceo_name: "string?",
    code: "string?",
    crt_id: "string?",
    crt_date: "date?",
    credit_limit: "string?",
    fax: "string?",
    homepage: "string?",
    name: "string?",
    owner_id: "string",
    remark: "string?",
    mod_id: "string?",
    mod_date: "date?",
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
  _id: string;
  code: string;
  crt_id?: string;
  crt_date?: Date;
  is_material?: number;
  name: string;
  owner_id: string;
  remark?: string;
  mod_id?: string;
  mod_date?: Date;
  sort_seq?: number;
  valid?: boolean;
};

export const part_typeSchema = {
  name: "part_type",
  properties: {
    _id: "string",
    code: "string",
    crt_id: "string?",
    crt_date: "date?",
    is_material: "int?",
    name: "string",
    owner_id: "string",
    remark: "string?",
    mod_id: "string?",
    mod_date: "date?",
    sort_seq: "int?",
    valid: "bool?",
  },
  primaryKey: "_id",
};

export type transfer_out = {
  _id: string;
  code: string;
  crt_id?: string;
  crt_date?: Date;
  owner_id: string;
  part_id?: part;
  quantity?: number;
  release_amont?: number;
  mod_id?: string;
  mod_date?: Date;
  transfer_date?: Date;
  trasnfer_type_id?: string;
  unit_price?: number;
  warehouse_id?: string;
  work_order_id?: string;
};

export const transfer_outSchema = {
  name: "transfer_out",
  properties: {
    _id: "string",
    code: "string",
    crt_id: "string?",
    crt_date: "date?",
    owner_id: "string",
    part_id: "part",
    quantity: "int?",
    release_amont: "int?",
    mod_id: "string?",
    mod_date: "date?",
    transfer_date: "date?",
    trasnfer_type_id: "string",
    unit_price: "int?",
    warehouse_id: "string",
    work_order_id: "string",
  },
  primaryKey: "_id",
};
