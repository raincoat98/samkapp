import { schemaType } from "./index";

export type unit = {
  unit_id: string;
  unit_name_kor: string;
  unit_name_eng: string;
};

export const unitSchema: schemaType = {
  name: "unit",
  properties: {
    unit_id: {
      type: "string",
      isPrimary: true,
      isNotNull: true,
    },
    unit_name_kor: {
      type: "string",
      isNotNull: true,
    },
    unit_name_eng: {
      type: "string",
      isNotNull: true,
    },
  },
};
