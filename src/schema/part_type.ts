import { schemaType } from "./index";

export type part_type = {
  part_type_id: string;
  part_type_name?: string;
};

export const part_typeSchema: schemaType = {
  name: "part_type",
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
