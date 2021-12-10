import { schemaType } from "./index";

export type transfer_out = {
  transfer_out_id: number;
  transfer_date: string;
  transfer_type_id: string;
  priorities: number;
  part_id: number;
  quantity?: number;
  unit_price?: number;
  release_amont?: number;
  warehouse_id?: number;
  work_order_id?: string;
};

export const transfer_outSchema: schemaType = {
  name: "transfer_out",
  properties: {
    transfer_out_id: {
      type: "number",
      isPrimary: true,
      isNotNull: true,
      isAutoSet: true,
      isNotVisible: true,
    },
    transfer_date: {
      type: "string",
      as: "date",
      isNotNull: true,
    },
    transfer_type_id: {
      type: "string",
      isNotNull: true,
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
    quantity: {
      type: "number",
      isNotNull: true,
    },
    unit_price: {
      type: "number",
      isAutoSet: true,
      isReadOnly: true,
    },
    release_amont: {
      type: "number",
      isAutoSet: true,
      isReadOnly: true,
    },
    warehouse_id: {
      type: "number",
      foreign: {
        table: "warehouse",
        key: "warehouse_id",
        display: "warehouse_name",
      },
      isNotNull: true,
    },
    work_order_id: {
      type: "string",
      foreign: {
        table: "work_order",
        key: "work_order_id",
        display: "work_order_number",
      },
      isAutoSet: true,
    },
  },
};
