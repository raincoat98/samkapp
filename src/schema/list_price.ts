import { schemaType } from "./index";

export type list_price = {
  part_id: number;
  start_date: string;
  end_date: string;
  list_price: number;
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
    start_date: {
      type: "date",
      isPrimary: true,
      isNotNull: true,
    },
    end_date: {
      type: "date",
      isNotNull: true,
    },
    list_price: {
      type: "number",
      default: true,
      isNotNull: true,
    },
  },
};
