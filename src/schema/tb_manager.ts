import { schemaType } from "./index";

export type tb_manager = {
  manager_id: number;
  customer_id?: number;
  cell_phone?: string;
  class_position?: string;
  email?: string;
  fax?: string;
  name: string;
  namecard?: string;
  remark?: string;
  tel?: string;
  use_yn?: boolean;
};

export const tb_managerSchema: schemaType = {
  name: "tb_manager",
  properties: {
    manager_id: {
      type: "number",
      isPrimary: true,
      isNotNull: true,
    },
    customer_id: {
      type: "number",
      isNotNull: true,
      foreign: {
        table: "tb_customer",
        key: "customer_id",
      },
    },
    cell_phone: {
      type: "string",
    },
    class_position: {
      type: "string",
    },
    email: {
      type: "string",
    },
    fax: {
      type: "string",
    },
    name: {
      type: "string",
      isNotNull: true,
    },
    namecard: {
      type: "string",
    },
    remark: {
      type: "string",
    },
    tel: {
      type: "string",
    },
    use_yn: {
      type: "boolean",
      default: true,
    },
  },
};
