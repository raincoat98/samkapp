import { schemaType } from "./index";

export type transfer_type = {
  transfer_type_id: string;
  transfer_type_name: string;
  transfer_flag?: number;
  use_yn: boolean;
};

export const transfer_typeSchema: schemaType = {
  name: "transfer_type",
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
      type: "number",
      default: 1,
      isNotNull: true,
      select: [
        {
          name: "입고",
          value: 0,
        },
        {
          name: "출고",
          value: 1,
        },
      ],
    },
    use_yn: {
      type: "boolean",
      default: true,
      isNotNull: true,
    },
  },
};
