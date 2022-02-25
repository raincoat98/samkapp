import { schemaType } from "./index";

export type product_order = {
  status?: number;
  prod_order_id: number;
  part_id: number;
  order_quantity: number;
  stocked_quantity: number;
  scrapped_quantity: number;
  start_dttm: string;
  due_date: string;
  work_order_id: number;
  remark?: string;
};

export const product_orderSchema: schemaType = {
  name: "product_order",
  properties: {
    status: {
      type: "number",
      select: [
        {
          name: "생산대기",
          value: 0,
        },
        {
          name: "생산중",
          value: 1,
        },
        {
          name: "생산완료",
          value: 2,
        },
      ],
      isAutoSet: true,
    },
    prod_order_id: {
      type: "number",
      isPrimary: true,
      isNotNull: true,
      isAutoSet: true,
      isNotVisible: true,
    },
    part_id: {
      type: "number",
      isNotNull: true,
      foreign: {
        table: "part",
        key: "part_id",
        display: "part_name",
      },
    },
    order_quantity: {
      type: "number",
      isNotNull: true,
    },
    stocked_quantity: {
      type: "number",
      isNotNull: true,
      isAutoSet: true,
    },
    scrapped_quantity: {
      type: "number",
      isNotNull: true,
      isAutoSet: true,
    },
    start_dttm: {
      type: "string",
      as: "date",
      isNotNull: true,
      isReadOnly: true,
    },
    due_date: {
      type: "string",
      as: "date",
      isNotNull: true,
      isReadOnly: true,
    },
    work_order_id: {
      type: "number",
      foreign: {
        table: "work_order",
        key: "work_order_id",
        display: "work_order_number",
      },
      isAutoSet: true,
      isReadOnly: true,
    },
    remark: {
      type: "string",
    },
    
  },
};
