import { schemaType } from "./index";

export type inventory = {
  inv_month?: string;
  part_id: number;
  warehouse_id: number;
  lot_no?: number;
  quantity: number;
  shelf?: string;
  bin?: number;
  status: boolean;
};

export const inventorySchema: schemaType = {
  name: "inventory",
  properties: {
    inv_month: {
      type: "string",
      as: "month",
      isReadOnly: true,
      isAutoSet: true,
    },
    part_id: {
      type: "number",
      isNotNull: true,
      isPrimary: true,
      foreign: {
        table: "part",
        key: "part_id",
        display: "part_name",
      },
    },
    warehouse_id: {
      type: "number",
      isNotNull: true,
      isPrimary: true,
      isAutoSet: true,
      foreign: {
        table: "warehouse",
        key: "warehouse_id",
        display: "warehouse_name",
      },
    },
    quantity: {
      type: "number",
      default: 0,
      isNotNull: true,
    },
    lot_no: {
      type: "number",
    },
    shelf: {
      type: "string",
    },
    bin: {
      type: "number",
    },
    status: {
      type: "boolean",
      isNotNull: true,
      isAutoSet: true,
      isDisalbePreview: true,
    },
    // 보이지 않는 필드
    spec1: {
      type: "string",
      isDisalbePreview: true,
      isNotVisible: true,
    },
    spec2: {
      type: "string",
      isDisalbePreview: true,
      isNotVisible: true,
    },
    spec3: {
      type: "string",
      isDisalbePreview: true,
      isNotVisible: true,
    },
    spec4: {
      type: "string",
      isDisalbePreview: true,
      isNotVisible: true,
    },
    spec5: {
      type: "string",
      isDisalbePreview: true,
      isNotVisible: true,
    },
  },
};
