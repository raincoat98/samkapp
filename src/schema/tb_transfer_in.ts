import { schemaType } from "./index";

export type tb_transfer_in = {
  transfer_in_id: number;
  transfer_date: string;
  transfer_type_id: string;
  part_id: number;
  quantity?: number;
  unit_price?: number;
  purchase_amont?: number;
  outsourcing_unit_price?: number;
  outsourcing_amont?: number;
  warehouse_id?: number;
  work_order_id?: number;
};

export const tb_transfer_inSchema: schemaType = {
  name: "tb_transfer_in",
  properties: {
    transfer_in_id: {
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
    purchase_amont: {
      type: "number",
    },
    outsourcing_unit_price: {
      type: "number",
    },
    outsourcing_amont: {
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
      type: "number",
      foreign: {
        table: "tb_work_order",
        key: "work_order_id",
      },
    },
  },
};
