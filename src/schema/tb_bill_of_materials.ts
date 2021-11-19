import { schemaType } from "./index";

export type tb_bill_of_materials = {
  bom_id: number;
  product_id?: number;
  assembly_id?: number;
  start_date?: Date;
  end_date?: Date;
  unit_id?: string;
  bom_level?: number;
  assembly_Qty?: number;
};

export const tb_bill_of_materialsSchema: schemaType = {
  name: "tb_bill_of_materials",
  properties: {
    bom_id: {
      type: "number",
      isPrimary: true,
      isNotNull: true,
    },
    product_id: {
      type: "number",
      foreign: {
        table: "tb_part",
        key: "part_id",
      },
    },
    assembly_id: {
      type: "number",
      foreign: {
        table: "tb_part",
        key: "part_id",
      },
    },
    start_date: {
      type: "date",
      isAutoSet: true,
      isReadOnly: true,
    },
    end_date: {
      type: "date",
      isAutoSet: true,
      isReadOnly: true,
    },
    unit_id: {
      type: "string",
      foreign: {
        table: "tb_unit",
        key: "unit_id",
      },
    },
    bom_level: {
      type: "number",
    },
    assembly_Qty: {
      type: "number",
    },
  },
};