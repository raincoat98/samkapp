import { schemaType } from "./index";
import moment from "moment";

export type transfer_out = {
  transfer_out_id: number;
  transfer_date: string;
  transfer_type_id: string;
  priorities: number;
  plan_date?: string;
  customer_id?: number;
  part_id: number;
  quantity?: number;
  unit_price?: number;
  release_amont?: number;
  warehouse_id?: number;
  work_order_id?: number;
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
      isAutoSet: true,
      isReadOnly: true,
    },
    transfer_type_id: {
      type: "string",
      isNotNull: true,
      foreign: {
        table: "transfer_type",
        key: "transfer_type_id",
        display: "transfer_type_name",
        filter: { transfer_flag: 1 },
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
    plan_date: {
      type: "string",
      as: "date",
      default: moment(new Date()).format("YYYY-MM-DD"),
    },
    customer_id: {
      type: "number",
      foreign: {
        table: "customer",
        key: "customer_id",
        display: "customer_name",
      },
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
      type: "number",
      foreign: {
        table: "work_order",
        key: "work_order_id",
        display: "work_order_number",
      },
      isAutoSet: true,
      isReadOnly: true,
    },
  },
};
