import { schemaType } from "./index";

export type tb_part = {
  part_id: number;
  part_number: string;
  part_name: string;
  spec1?: string;
  spec2?: string;
  spec3?: string;
  spec4?: string;
  spec5?: string;
  part_type_id: string;
  group2_id: number;
  warehouse_id: number;
  bom_id?: number;
  unit_id: string;
  standard_cost?: number;
  list_Price?: number;
  remark?: string;
  use_yn?: boolean;
};

export const tb_partSchema: schemaType = {
  name: "tb_part",
  properties: {
    part_id: {
      type: "number",
      isPrimary: true,
      isAutoSet: true,
      isNotNull: true,
    },
    part_number: {
      type: "string",
      isNotNull: true,
    },
    part_name: {
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
    part_type_id: {
      type: "string",
      isNotNull: true,
      foreign: {
        table: "tb_part_type",
        key: "part_type_id",
        display: "part_type_name",
      },
    },
    group2_id: {
      type: "number",
      isNotNull: true,
      foreign: {
        table: "tb_group2",
        key: "group2_id",
        display: "group2_name",
      },
    },
    warehouse_id: {
      type: "number",
      isNotNull: true,
      foreign: {
        table: "tb_warehouse",
        key: "warehouse_id",
        display: "warehouse_name",
      },
    },
    bom_id: {
      type: "number",
      foreign: {
        table: "tb_bill_of_materials",
        key: "bom_id",
        display: "bom_id",
      },
    },
    unit_id: {
      type: "string",
      isNotNull: true,
      foreign: {
        table: "tb_unit",
        key: "unit_id",
      },
    },
    standard_cost: {
      type: "number",
    },
    list_Price: {
      type: "number",
    },
    remark: {
      type: "string",
      isTextarea: true,
    },
    use_yn: {
      type: "boolean",
    },
  },
};
