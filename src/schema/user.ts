import { schemaType } from "./index";

export type user = {
  user_id: number;
  privilege: string;
  name: string;
};

export const userSchema: schemaType = {
  name: "user",
  properties: {
    user_id: {
      type: "number",
      isPrimary: true,
      isNotNull: true,
      isAutoSet: true,
      isNotVisible: true,
    },
    privilege: {
      type: "string",
      isNotNull: true,
      isAutoSet: true,
      isReadOnly: true,
      isNotVisible: true,
    },
    name: {
      type: "string",
      isNotNull: true,
    },
  },
};
