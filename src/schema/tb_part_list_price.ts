export type tb_part_list_price = {
  part_id?: number;
  start_date: string;
  end_date: string;
  list_price?: string;
};

export const tb_part_list_priceSchema = {
  name: "tb_part_list_price",
  properties: {
    part_id: "number?",
    start_date: "string",
    end_date: "string",
    list_price: "string?",
  },
  primaryKey: "part_id",
};
