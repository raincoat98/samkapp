export type tb_transfer_out = {
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

export const tb_transfer_outSchema = {
  name: "tb_transfer_out",
  properties: {
    transfer_out_id: "number",
    transfer_date: "string",
    transfer_type_id: "string",
    part_id: "number",
    quantity: "number",
    unit_price: "number?",
    release_amont: "number?",
    warehouse_id: "string?",
    work_order_id: "string?",
  },
  primaryKey: "transfer_out_id",
};
