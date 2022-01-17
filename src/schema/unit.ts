import { schemaType } from "./index";

export type unit = {
  unit_id: string;
  unit_name: string;
};

export const unitSchema: schemaType = {
  name: "unit",
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
