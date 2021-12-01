// 스키마 타입
export type schemaType = {
  name: COLLECTION_NAME_TYPE;
  embedded?: boolean;
  properties: Record<string, propertyType>;
};

export type dataType = "string" | "number" | "boolean" | "date" | "month";

export type propertyType = {
  type: dataType; // 실제 데이터 타입
  as?: "date" | "month"; // (type: string, date)  데이터를 입력할 시 사용되는 인풋 종류
  default?: any; // 기본값
  select?: selectType[]; // 해당 배열의 값 중에서만 값을 선택 가능
  length?: number; // 값 최대 길이
  foreign?: {
    table: COLLECTION_NAME_TYPE; // 외부 테이블 이름
    key: string; // 외부 테이블에서 참조하는 프로퍼티의 키
    display?: string; // 외부 테이블 선택시 유저가 보게 될 프로퍼티의 키
  };
  isPrimary?: boolean; // 기본 키 여부
  isAutoSet?: boolean; // 데이터베이스 내부에서 자동으로 입력하는지 여부
  isNotNull?: boolean; // 필수로 입력되어야 하는지 여부
  isReadOnly?: boolean; // 유저가 읽기만 가능하고 작성하는 것은 불가능한 값
  isTextarea?: boolean; // (type: string) 문자열을 여러 줄로 받을지 여부
  isArray?: boolean; // 값이 배열인지 배열 여부
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
