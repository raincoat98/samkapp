import { schemaType } from "./index";

export type tb_warehouse = {
  warehouse_id: number;
  warehouse_name: string;
  rack_no?: number;
  cell_no?: number;
  row_no?: number;
  use_yn?: boolean;
};

export const tb_warehouseSchema: schemaType = {
  name: "tb_warehouse",
  properties: {
    warehouse_id: {
      type: "number",
      isPrimary: true,
      isNotNull: true,
    },
    warehouse_name: {
      type: "string",
      isNotNull: true,
    },
    rack_no: {
      type: "number",
    },
    cell_no: {
      type: "number",
    },
    row_no: {
      type: "number",
    },
    use_yn: {
      type: "boolean",
      default: true,
    },
  },
};
