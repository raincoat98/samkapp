import { schemaType } from "./index";

export type work_order = {
  work_order_id: number;
  work_order_number?: string;
  customer_id?: number;
  part_id?: number;
  quantity: number;
  plan_date?: string;
  transfer_date: string;
  transfer_type_id: string;
  priorities: number;
  status?: number;
  remark?: string;
};

export const work_orderSchema: schemaType = {
  name: "work_order",
  properties: {
    work_order_id: {
      type: "number",
      isPrimary: true,
      isAutoSet: true,
      isNotNull: true,
      isReadOnly: true,
    },
    work_order_number: {
      type: "string",
      isAutoSet: true,
      isReadOnly: true,
    },
    customer_id: {
      type: "number",
      foreign: {
        table: "customer",
        key: "customer_id",
        display: "customer_name",
      },
      isReadOnly: true,
    },
    part_id: {
      type: "number",
      foreign: {
        table: "part",
        key: "part_id",
        display: "part_name",
      },
      isReadOnly: true,
    },
    quantity: {
      type: "number",
      isNotNull: true,
      isReadOnly: true,
    },
    plan_date: {
      type: "string",
      as: "date",
      isReadOnly: true,
    },
    transfer_date: {
      type: "string",
      as: "date",
      isReadOnly: true,
    },
    transfer_type_id: {
      type: "string",
      isReadOnly: true,
      foreign: {
        table: "transfer_type",
        key: "transfer_type_id",
        display: "transfer_type_name",
      },
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
      isNotNull: true,
      isReadOnly: true,
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
      isTextarea: true,
      isReadOnly: true,
    },
  },
};
