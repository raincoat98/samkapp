export type tb_inventory = {
  inv_month?: string;
  part_id: number;
  warehouse_id: string;
  lot_no?: string;
  quantity: number;
  actual_quantity?: number;
  shelf?: string;
  bin?: number;
};

export const tb_inventorySchema = {
  name: "tb_inventory",
  properties: {
    inv_month: "string?",
    part_id: "number",
    warehouse_id: "string",
    lot_no: "string?",
    quantity: "number",
    actual_quantity: "number?",
    shelf: "string?",
    bin: "number?",
  },
  primaryKey: "part_id",
};
