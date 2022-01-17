import { schemaType } from "./index";

export type group2 = {
  group2_id: number;
  group2_name: string;
  spec1?: string;
  spec2?: string;
  spec3?: string;
  spec4?: string;
  spec5?: string;
  search_group?: number;
  sort_seq?: number;
  remark?: string;
  use_yn?: boolean;
};

export const group2Schema: schemaType = {
  name: "group2",
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
    search_group: {
      type: "number",
    },
    sort_seq: {
      type: "number",
      isDisalbePreview: true,
    },
    remark: {
      type: "string",
      isTextarea: true,
    },
    use_yn: {
      type: "boolean",
      default: true,
      isDisalbePreview: true,
    },
  },
};
