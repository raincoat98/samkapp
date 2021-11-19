import { schemaType } from "./index";

export type tb_work_order = {
  work_order_id: number;
  work_order_number?: string;
  customer_id?: string;
  part_id?: number;
  quantity?: number;
  plan_date?: string;
  priorities?: number;
  status?: number;
  remark?: string;
};

export const tb_work_orderSchema: schemaType = {
  name: "tb_work_order",
  properties: {
    work_order_id: {
      type: "number",
      isPrimary: true,
      isAutoSet: true,
      isNotNull: true,
    },
    work_order_number: {
      type: "string",
    },
    customer_id: {
      type: "string",
      foreign: {
        table: "tb_customer",
        key: "customer_id",
      },
    },
    part_id: {
      type: "number",
      foreign: {
        table: "tb_part",
        key: "part_id",
      },
    },
    quantity: {
      type: "number",
    },
    plan_date: {
      type: "string",
    },
    priorities: {
      type: "number",
    },
    status: {
      type: "number",
    },
    remark: {
      type: "string",
    },
  },
};
