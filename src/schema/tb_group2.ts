import { schemaType } from "./index";

export type tb_group2 = {
  group2_id: number;
  group2_name: string;
  spec1?: string;
  spec2?: string;
  spec3?: string;
  spec4?: string;
  spec5?: string;
  group1_id?: number;
  search_group?: number;
  sort_seq?: number;
  remark?: string;
  use_yn?: boolean;
};

export const tb_group2Schema: schemaType = {
  name: "tb_group2",
  properties: {
    group2_id: {
      type: "number",
      isPrimary: true,
      isAutoSet: true,
      isNotNull: true,
    },
    group2_name: {
      type: "string",
      isNotNull: true,
    },
    spec1: {
      type: "string",
    },
    spec2: {
      type: "string",
    },
    spec3: {
      type: "string",
    },
    spec4: {
      type: "string",
    },
    spec5: {
      type: "string",
    },
    group1_id: {
      type: "number",
      isNotNull: true,
      foreign: {
        table: "tb_group1",
        key: "group1_id",
        display: "group1_name",
      },
    },
    search_group: {
      type: "number",
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
