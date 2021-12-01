import { schemaType } from "./index";

export type tb_inventory = {
  inv_month?: string;
  part_id: number;
  warehouse_id: number;
  lot_no?: number;
  quantity: number;
  actual_quantity?: number;
  shelf?: string;
  bin?: number;
};

export const tb_inventorySchema: schemaType = {
  name: "tb_inventory",
  properties: {
    inv_month: {
      type: "string",
      as: "month",
    },
    part_id: {
      type: "number",
      isNotNull: true,
      isPrimary: true,
      foreign: {
        table: "tb_part",
        key: "part_id",
        display: "part_name",
      },
    },
    warehouse_id: {
      type: "number",
      isNotNull: true,
      isPrimary: true,
      foreign: {
        table: "tb_warehouse",
        key: "warehouse_id",
        display: "warehouse_name",
      },
    },
    lot_no: {
      type: "number",
    },
    quantity: {
      type: "number",
      default: 0,
      isNotNull: true,
    },
    actual_quantity: {
      type: "number",
    },
    shelf: {
      type: "string",
    },
    bin: {
      type: "number",
    },
  },
};
