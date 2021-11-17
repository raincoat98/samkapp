export type tb_part = {
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
  use_yn?: boolean;
  del_yn?: string;
};

export const tb_partSchema = {
  name: "tb_part",
  properties: {
    part_id: "number",
    part_name: "string",
    part_number: "string",
    part_spec: "string",
    part_type_id: "string",
    group2_id: "string",
    warehouse_id: "string?",
    bom_id: "number?",
    unit_id: "string?",
    standard_cost: "number?",
    list_Price: "number?",
    remark: "string?",
    use_yn: "boolean?",
    del_yn: "string?",
  },
  primaryKey: "part_id",
};
