import { schemaType } from "./index";

export type user = {
  user_id: string;
  privilege: number;
  name: string;
};

export const userSchema: schemaType = {
  name: "user",
  properties: {
    user_id: {
      type: "string",
      isPrimary: true,
      isNotNull: true,
      isAutoSet: true,
      isNotVisible: true,
    },
    privilege: {
      type: "number",
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
