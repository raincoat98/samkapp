export type tb_manager = {
  _id: string;
  cell_phone?: string;
  class_position?: string;
  crt_id?: string;
  crt_date?: Date;
  customer_id?: string;
  email?: string;
  fax?: string;
  name: string;
  namecard?: string;
  owner_id: string;
  remark?: string;
  mod_id?: string;
  mod_date?: Date;
  tel?: string;
};

export const tb_managerSchema = {
  name: "tb_manager",
  properties: {
    _id: "string",
    cell_phone: "string?",
    class_position: "string?",
    crt_id: "string?",
    crt_date: "date?",
    customer_id: "string",
    email: "string?",
    fax: "string?",
    name: "string",
    namecard: "string?",
    owner_id: "string",
    remark: "string?",
    mod_id: "string?",
    mod_date: "date?",
    tel: "string?",
  },
  primaryKey: "_id",
};
