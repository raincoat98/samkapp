import { schemaType } from "./index";

export type bill_of_materials = {
  bom_id: number;
  product_id?: number;
  assembly_Qty?: number;
  assembly_id?: number;
  start_date?: Date;
  end_date?: Date;
  unit_id?: string;
  bom_level?: number;
};

export const bill_of_materialsSchema: schemaType = {
  name: "bill_of_materials",
  properties: {
    bom_id: {
      type: "number",
      isPrimary: true,
      isNotNull: true,
      isAutoSet: true,
    },
    product_id: {
      type: "number",
      foreign: {
        table: "part",
        key: "part_id",
        display: "part_name",
      },
    },
    assembly_Qty: {
      type: "number",
    },
    assembly_id: {
      type: "number",
      foreign: {
        table: "part",
        key: "part_id",
        display: "part_name",
      },
    },
    start_date: {
      type: "date",
      isAutoSet: true,
    },
    end_date: {
      type: "date",
      isAutoSet: true,
    },
    unit_id: {
      type: "string",
      foreign: {
        table: "unit",
        key: "unit_id",
        display: "unit_name",
      },
    },
    bom_level: {
      type: "number",
    },
  },
};
