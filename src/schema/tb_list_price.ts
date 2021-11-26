import { schemaType } from "./index";

export type tb_list_price = {
  part_id: number;
  start_date: string;
  end_date: string;
  list_price: number;
};

export const tb_list_priceSchema: schemaType = {
  name: "tb_list_price",
  properties: {
    part_id: {
      type: "number",
      isPrimary: true,
      isNotNull: true,
      foreign: {
        table: "tb_part",
        key: "part_id",
        display: "part_name",
      },
    },
    start_date: {
      type: "string",
      isPrimary: true,
      isNotNull: true,
    },
    end_date: {
      type: "string",
      isNotNull: true,
    },
    list_price: {
      type: "number",
      default: true,
      isNotNull: true,
    },
  },
};
