export type tb_unit = {
  unit_id: string;
  unit_name: string;
};

export const tb_unitSchema = {
  name: "tb_unit",
  properties: {
    unit_id: "string",
    unit_name: "string",
  },
  primaryKey: "unit_id",
};
