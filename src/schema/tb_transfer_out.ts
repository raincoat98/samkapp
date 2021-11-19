import { schemaType } from "./index";

export type tb_transfer_out = {
  transfer_out_id: number;
  transfer_date: string;
  transfer_type_id: string;
  part_id: number;
  quantity?: number;
  unit_price?: number;
  release_amont?: number;
  warehouse_id?: number;
  work_order_id?: string;
};

export const tb_transfer_outSchema: schemaType = {
  name: "tb_transfer_out",
  properties: {
    transfer_out_id: {
      type: "number",
      isPrimary: true,
      isNotNull: true,
    },
    transfer_date: {
      type: "string",
      isNotNull: true,
    },
    transfer_type_id: {
      type: "string",
      isNotNull: true,
      foreign: {
        table: "tb_transfer_type",
        key: "transfer_type_id",
      },
    },
    part_id: {
      type: "number",
      isNotNull: true,
      foreign: {
        table: "tb_part",
        key: "part_id",
      },
    },
    quantity: {
      type: "number",
    },
    unit_price: {
      type: "number",
    },
    release_amont: {
      type: "number",
    },
    warehouse_id: {
      type: "number",
      foreign: {
        table: "tb_warehouse",
        key: "warehouse_id",
      },
    },
    work_order_id: {
      type: "string",
      foreign: {
        table: "tb_work_order",
        key: "work_order_id",
      },
    },
  },
};
