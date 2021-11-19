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
      default: 0,
      select: [
        {
          name: "보통",
          value: 0,
        },
        {
          name: "긴급",
          value: 1,
        },
        {
          name: "기타",
          value: 2,
        },
      ],
    },
    status: {
      type: "number",
      select: [
        {
          name: "미확정",
          value: null,
        },
        {
          name: "대기",
          value: 0,
        },
        {
          name: "진행중",
          value: 1,
        },
        {
          name: "완료",
          value: 2,
        },
      ],
    },
    remark: {
      type: "string",
    },
  },
};
