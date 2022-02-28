import { schemaType } from "./index";

export type list_price = {
  part_id: number;
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
    list_price: {
      type: "number",
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
    },
  },
};
