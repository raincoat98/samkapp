export type tb_transfer_type = {
  transfer_type_id: string;
  transfer_type_name?: string;
  transfer_flag?: number;
  sort_seq?: number;
  remark?: string;
  use_yn?: boolean;
};

export const tb_transfer_typeSchema = {
  name: "tb_transfer_type",
  properties: {
    transfer_type_id: "string",
    transfer_type_name: "string?",
    transfer_flag: "string?",
    sort_seq: "string?",
    remark: "string?",
    use_yn: "boolean?",
  },
  primaryKey: "transfer_type_id",
};
