import { schemaType } from "./index";

export type transfer_in = {
  transfer_in_id: number;
  transfer_date: string;
  transfer_type_id: string;
  part_id: number;
  quantity: number;
  unit_price?: number;
  purchase_amont?: number;
  outsourcing_unit_price?: number;
  outsourcing_amont?: number;
  warehouse_id?: number;
  work_order_id?: number;
};

export const transfer_inSchema: schemaType = {
  name: "transfer_in",
  properties: {
    transfer_in_id: {
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
        filter: { transfer_flag: 0 },
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
    purchase_amont: {
      type: "number",
      isAutoSet: true,
      isReadOnly: true,
    },
    outsourcing_unit_price: {
      type: "number",
      isAutoSet: true,
      isReadOnly: true,
      isDisalbePreview: true,
    },
    outsourcing_amont: {
      type: "number",
      isAutoSet: true,
      isReadOnly: true,
      isDisalbePreview: true,
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
    },
  },
};
