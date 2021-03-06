import { schemaType } from "./index";

export type product_order = {
  product_order_id: number;
  work_order_id: number;
  part_id: number;
  order_quantity: number;
  stocked_quantity: number;
  scrapped_quantity: number;
  remark?: string;
};

export const product_orderSchema: schemaType = {
  name: "product_order",
  properties: {
    product_order_id: {
      type: "number",
      isPrimary: true,
      isNotNull: true,
      isAutoSet: true,
      isNotVisible: true,
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
    },
    scrapped_quantity: {
      type: "number",
      isNotNull: true,
    },
    remark: {
      type: "string",
    },
  },
};
