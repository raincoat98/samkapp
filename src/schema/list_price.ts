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
