import { schemaType } from "./index";

export type tb_transfer_type = {
  transfer_type_id: string;
  transfer_type_name?: string;
  transfer_flag?: boolean;
  use_yn?: boolean;
};

export const tb_transfer_typeSchema: schemaType = {
  name: "tb_transfer_type",
  properties: {
    transfer_type_id: {
      type: "string",
      isPrimary: true,
      isNotNull: true,
    },
    transfer_type_name: {
      type: "string",
      isNotNull: true,
    },
    transfer_flag: {
      type: "boolean",
      isNotNull: true,
    },
    use_yn: {
      type: "boolean",
      default: true,
    },
  },
};
