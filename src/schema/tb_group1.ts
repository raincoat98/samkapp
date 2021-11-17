export type tb_group1 = {
  group1_id: string;
  group1_name: string;
  is_material?: number;
  sort_seq?: number;
  remark?: string;
  use_yn?: boolean;
};

export const tb_group1Schema = {
  name: "tb_group1",
  properties: {
    group1_id: "string",
    group1_name: "string",
    is_material: "number?",
    sort_seq: "number?",
    remark: "string?",
    use_yn: "boolean?",
  },
  primaryKey: "group1_id",
};
