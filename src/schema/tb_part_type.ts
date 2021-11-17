export type tb_part_type = {
  part_type_id: string;
  part_type_name?: string;
};

export const tb_part_typeSchema = {
  name: "tb_part_type",
  properties: {
    part_type_id: "string",
    part_type_name: "string?",
  },
  primaryKey: "part_type_id",
};
