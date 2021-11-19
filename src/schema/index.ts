// 스키마 타입
export type schemaType = {
  name: COLLECTION_NAME_TYPE;
  embedded?: boolean;
  properties: Record<string, propertyType>;
};

export type propertyType = {
  type: "string" | "number" | "boolean" | "date";
  default?: any;
  select?: selectType[];
  length?: number;
  foreign?: {
    table: COLLECTION_NAME_TYPE;
    key: string;
  };
  isPrimary?: boolean;
  isAutoSet?: boolean;
  isNotNull?: boolean;
  isReadOnly?: boolean;
  isArray?: boolean;
};

export type selectType = { name?: string; value: any };

// 데이터베이스 컬렉션 이름
export const COLLECTION_NAME = {
  tb_bill_of_materials: "tb_bill_of_materials",
  tb_customer: "tb_customer",
  tb_group1: "tb_group1",
  tb_group2: "tb_group2",
  tb_inventory: "tb_inventory",
  tb_list_price: "tb_list_price",
  tb_manager: "tb_manager",
  tb_part_type: "tb_part_type",
  tb_part: "tb_part",
  tb_transfer_in: "tb_transfer_in",
  tb_transfer_out: "tb_transfer_out",
  tb_transfer_type: "tb_transfer_type",
  tb_unit: "tb_unit",
  tb_warehouse: "tb_warehouse",
  tb_work_order: "tb_work_order",
} as const;
export type COLLECTION_NAME_TYPE =
  typeof COLLECTION_NAME[keyof typeof COLLECTION_NAME];
