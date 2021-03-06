import { schemaType } from "./index";

export type group1 = {
  group1_id: string;
  group1_name: string;
  is_material?: number;
  sort_seq?: number;
  remark?: string;
  use_yn?: boolean;
};

export const group1Schema: schemaType = {
  name: "group1",
  properties: {
    group1_id: {
      type: "string",
      isPrimary: true,
      isAutoSet: true,
      isNotNull: true,
    },
    group1_name: {
      type: "string",
      isNotNull: true,
    },
    is_material: {
      type: "number",
      default: 0,
      select: [
        {
          name: "제품",
          value: 0,
        },
        {
          name: "자재",
          value: 1,
        },
      ],
    },
    sort_seq: {
      type: "number",
    },
    remark: {
      type: "string",
      isTextarea: true,
    },
    use_yn: {
      type: "boolean",
      default: true,
    },
  },
};
