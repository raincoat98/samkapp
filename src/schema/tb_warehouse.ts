export type tb_warehouse = {
  warehouse_id: number;
  warehouse_name: string;
  rack_no?: number;
  cell_no?: number;
  row_no?: number;
  use_yn?: boolean;
  del_yn?: string;
};

export const tb_warehouseSchema = {
  name: "tb_warehouse",
  properties: {
    warehouse_id: "number",
    warehouse_name: "string",
    rack_no: "number?",
    cell_no: "number?",
    row_no: "number?",
    use_yn: "boolean?",
    del_yn: "string?",
  },
  primaryKey: "warehouse_id",
};
