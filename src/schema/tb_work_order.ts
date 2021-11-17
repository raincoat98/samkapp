export type tb_work_order = {
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

export const tb_work_orderSchema = {
  name: "tb_work_order",
  properties: {
    work_order_id: "number",
    work_order_number: "string?",
    customer_id: "string?",
    part_id: "number?",
    quantity: "number?",
    plan_date: "date?",
    priorities: "number?",
    status: "number?",
    remark: "string?",
  },
  primaryKey: "work_order_id",
};
