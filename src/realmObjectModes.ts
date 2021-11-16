export type tb_transfer_in = {
  transfer_in_id: number;
  transfer_date: string;
  transfer_type_id: string;
  part_id: number;
  quantity: number;
  unit_price?: number;
  purchase_amont?: number;
  outsourcing_unit_price?: number;
  outsourcing_amont?: number;
  warehouse_id?: number;
  work_order_id?: number;
};

export const tb_transfer_inSchema = {
  name: "tb_transfer_in",
  properties: {
    transfer_in_id: "int",
    transfer_date: "string",
    transfer_type_id: "string",
    part_id: "int",
    quantity: "int",
    unit_price: "int?",
    purchase_amont: "int?",
    outsourcing_unit_price: "int?",
    outsourcing_amont: "int?",
    warehouse_id: "int?",
    work_order_id: "int?",
  },
  primaryKey: "transfer_in_id",
};

export type tb_transfer_out = {
  transfer_in_id: number;
  transfer_date: string;
  transfer_type_id: string;
  part_id: number;
  quantity: number;
  unit_price?: number;
  release_amont?: number;
  warehouse_id?: number;
  work_order_id?: number;
};

export const tb_transfer_outSchema = {
  name: "tb_transfer_out",
  properties: {
    transfer_out_id: "int",
    transfer_date: "string",
    transfer_type_id: "string",
    part_id: "int",
    quantity: "int",
    unit_price: "int?",
    release_amont: "int?",
    warehouse_id: "int?",
    work_order_id: "int?",
  },
  primaryKey: "transfer_out_id",
};

export type part_group_2 = {
  group2_id: string;
  group2_name: string;
  group1_id?: string;
  search_group?: number;
  sort_seq?: number;
  remark?: string;
  use_yn?: string;
};

export const part_group_2Schema = {
  name: "tb_group2",
  properties: {
    group2_id: "string",
    group2_name: "string",
    group1_id: "string?",
    search_group: "int?",
    sort_seq: "int?",
    remark: "string?",
    use_yn: "string?",
  },
  primaryKey: "group2_id",
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
  part_name: string;
  part_number: string;
  part_spec: string;
  part_type_id: string;
  group2_id: string;
  warehouse_id?: string;
  bom_id?: number;
  unit_id?: string;
  standard_cost?: number;
  list_Price?: number;
  remark?: string;
  use_yn?: string;
  del_yn?: string;
};

export const partSchema = {
  name: "tb_part",
  properties: {
    part_id: "int",
    part_name: "string",
    part_number: "string",
    part_spec: "string",
    part_type_id: "string",
    group2_id: "string",
    warehouse_id: "string?",
    bom_id: "int?",
    unit_id: "string?",
    standard_cost: "int?",
    list_Price: "int?",
    remark: "string?",
    use_yn: "string?",
    del_yn: "string?",
  },
  primaryKey: "part_id",
};

export type part_bills_of_material = {
  bom_id: number;
  product_id?: number;
  assembly_id?: number;
  start_date?: Date;
  end_date?: Date;
  unit_id?: string;
  bom_level?: number;
  assembly_Qty?: number;
};

export const part_bills_of_materialSchema = {
  name: "tb_bill_of_materials",
  properties: {
    bom_id: "int",
    product_id: "int?",
    assembly_id: "int?",
    start_date: "date?",
    end_date: "date?",
    unit_id: "string?",
    bom_level: "int?",
    assembly_Qty: "int?",
  },
  primaryKey: "bom_id",
};

export type part_group_1 = {
  group1_id: string;
  group1_name: string;
  is_material?: number;
  sort_seq?: number;
  remark?: string;
  use_yn?: string;
};

export const part_group_1Schema = {
  name: "tb_group1",
  properties: {
    group1_id: "string",
    group1_name: "string",
    is_material: "int?",
    sort_seq: "int?",
    remark: "string?",
    use_yn: "string?",
  },
  primaryKey: "group1_id",
};

export type warehouse = {
  warehouse_id: string;
  warehouse_name: string;
  rack_no?: number;
  cell_no?: number;
  row_no?: number;
  use_yn?: string;
  del_yn?: string;
};

export const warehouseSchema = {
  name: "tb_warehouse",
  properties: {
    warehouse_id: "string",
    warehouse_name: "string",
    rack_no: "int?",
    cell_no: "int?",
    row_no: "int?",
    use_yn: "string?",
    del_yn: "string?",
  },
  primaryKey: "warehouse_id",
};

export type part_price = {
  part_id?: number;
  start_date: string;
  end_date: string;
  list_price?: string;
};

export const part_priceSchema = {
  name: "tb_part_list_price",
  properties: {
    part_id: "int?",
    start_date: "string",
    end_date: "string",
    list_price: "string?",
  },
  primaryKey: "part_id",
};

export type inv = {
  inv_month?: string;
  part_id: number;
  warehouse_id: string;
  lot_no?: string;
  quantity: number;
  actual_quantity?: number;
  shelf?: string;
  bin?: number;
};

export const invSchema = {
  name: "tb_inventory",
  properties: {
    inv_month: "string?",
    part_id: "int",
    warehouse_id: "string",
    lot_no: "string?",
    quantity: "int",
    actual_quantity: "int?",
    shelf: "string?",
    bin: "int?",
  },
  primaryKey: "inv_month",
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
  name: "tb_transfer_in",
  properties: {
    transfer_in_id: "int?",
    transfer_date: "string?",
    transfer_type_id: "string?",
    part_id: "int?",
    quantity: "int?",
    unit_price: "int?",
    purchase_amont: "int?",
    outsourcing_unit_price: "int?",
    outsourcing_amont: "int?",
    warehouse_id: "string?",
    work_order_id: "int?",
  },
  primaryKey: "transfer_in_id",
};

export type unit = {
  unit_id: string;
  unit_name: string;
};

export const unitSchema = {
  name: "tb_unit",
  properties: {
    unit_id: "string",
    unit_name: "string",
  },
  primaryKey: "unit_id",
};

export type transfer_type = {
  transfer_type_id: string;
  transfer_type_name?: string;
  transfer_flag?: number;
  sort_seq?: number;
  remark?: string;
  use_yn?: string;
};

export const transfer_typeSchema = {
  name: "tb_transfer_type",
  properties: {
    transfer_type_id: "string",
    transfer_type_name: "string?",
    transfer_flag: "string?",
    sort_seq: "string?",
    remark: "string?",
    use_yn: "string?",
  },
  primaryKey: "transfer_type_id",
};

export type work_order = {
  work_order_id: number;
  work_order_number?: string;
  customer_id?: string;
  part_id?: number;
  quantity?: number;
  plan_date?: Date;
  priorities?: number;
  status?: number;
  remark?: string;
};

export const work_orderSchema = {
  name: "tb_work_order",
  properties: {
    work_order_id: "int",
    work_order_number: "string?",
    customer_id: "string?",
    part_id: "int?",
    quantity: "int?",
    plan_date: "date?",
    priorities: "int?",
    status: "int?",
    remark: "string?",
  },
  primaryKey: "work_order_id",
};

export type customer = {
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
  use_yn?: string;
};

export const customerSchema = {
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
    credit_limit: "int?",
    remark: "string?",
    use_yn: "string?",
  },
  primaryKey: "customer_id",
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
  part_type_id: string;
  part_type_name?: string;
};

export const part_typeSchema = {
  name: "tb_part_type",
  properties: {
    part_type_id: "string",
    part_type_name: "string?",
  },
  primaryKey: "part_type_id",
};

export type transfer_out = {
  transfer_out_id: number;
  transfer_date: string;
  transfer_type_id: string;
  part_id: number;
  quantity: number;
  unit_price?: number;
  release_amont?: number;
  warehouse_id?: string;
  work_order_id?: string;
};

export const transfer_outSchema = {
  name: "tb_transfer_out",
  properties: {
    transfer_out_id: "int",
    transfer_date: "string",
    transfer_type_id: "string",
    part_id: "int",
    quantity: "int",
    unit_price: "int?",
    release_amont: "int?",
    warehouse_id: "string?",
    work_order_id: "string?",
  },
  primaryKey: "transfer_out_id",
};
