import { schemaType } from "./index";

export type list_price = {
  part_id: number;
  spec1?: string;
  spec2?: string;
  spec3?: string;
  spec4?: string;
  spec5?: string;
  list_price: number;
  start_date: string;
  end_date: string;
};

export const list_priceSchema: schemaType = {
  name: "list_price",
  properties: {
    part_id: {
      type: "number",
      isPrimary: true,
      isNotNull: true,
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
    list_price: {
      type: "number",
      default: true,
      isNotNull: true,
    },
    start_date: {
      type: "string",
      as: "date",
      isPrimary: true,
      isNotNull: true,
    },
    end_date: {
      type: "string",
      as: "date",
      isNotNull: true,
    },
  },
};
