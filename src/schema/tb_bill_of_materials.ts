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

export const tb_bill_of_materialsSchema = {
  name: "tb_bill_of_materials",
  properties: {
    bom_id: "number",
    product_id: "number?",
    assembly_id: "number?",
    start_date: "date?",
    end_date: "date?",
    unit_id: "string?",
    bom_level: "number?",
    assembly_Qty: "number?",
  },
  primaryKey: "bom_id",
};
