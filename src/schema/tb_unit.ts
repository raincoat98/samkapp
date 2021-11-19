import { schemaType } from "./index";

export type tb_unit = {
  unit_id: string;
  unit_name: string;
};

export const tb_unitSchema: schemaType = {
  name: "tb_unit",
  properties: {
    unit_id: {
      type: "string",
      isPrimary: true,
      isNotNull: true,
    },
    unit_name: {
      type: "string",
      isNotNull: true,
    },
  },
};
