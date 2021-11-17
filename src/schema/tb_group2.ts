export type tb_group2 = {
  group2_id: string;
  group2_name: string;
  group1_id?: string;
  search_group?: number;
  sort_seq?: number;
  remark?: string;
  use_yn?: boolean;
};

export const tb_group2Schema = {
  name: "tb_group2",
  properties: {
    group2_id: "string",
    group2_name: "string",
    group1_id: "string?",
    search_group: "number?",
    sort_seq: "number?",
    remark: "string?",
    use_yn: "boolean?",
  },
  primaryKey: "group2_id",
};
