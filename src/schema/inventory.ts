import { schemaType } from "./index";

export type inventory = {
  inv_month?: string;
  part_id: number;
  warehouse_id: number;
  quantity: number;
  status: boolean;
};

export const inventorySchema: schemaType = {
  name: "inventory",
  properties: {
    inv_month: {
      type: "string",
      as: "month",
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
    spec1: {
      type: "string",
      isReadOnly: true,
      isAutoSet: true,
    },
    spec2: {
      type: "string",
      isReadOnly: true,
      isAutoSet: true,
    },
    spec3: {
      type: "string",
      isReadOnly: true,
      isAutoSet: true,
    },
    spec4: {
      type: "string",
      isReadOnly: true,
      isAutoSet: true,
    },
    spec5: {
      type: "string",
      isReadOnly: true,
      isAutoSet: true,
    },
    warehouse_id: {
      type: "number",
      isNotNull: true,
      isPrimary: true,
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
    status: {
      type: "boolean",
      isNotNull: true,
      isDisalbePreview: true,
    },
  },
};
