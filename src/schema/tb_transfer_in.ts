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
    transfer_in_id: "number",
    transfer_date: "string",
    transfer_type_id: "string",
    part_id: "number",
    quantity: "number",
    unit_price: "number?",
    purchase_amont: "number?",
    outsourcing_unit_price: "number?",
    outsourcing_amont: "number?",
    warehouse_id: "number?",
    work_order_id: "number?",
  },
  primaryKey: "transfer_in_id",
};
