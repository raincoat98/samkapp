import { schemaType } from "./index";

export type tb_part_type = {
  part_type_id: string;
  part_type_name?: string;
};

export const tb_part_typeSchema: schemaType = {
  name: "tb_part_type",
  properties: {
    part_type_id: {
      type: "string",
      isPrimary: true,
      isNotNull: true,
    },
    part_type_name: {
      type: "string",
    },
  },
};
