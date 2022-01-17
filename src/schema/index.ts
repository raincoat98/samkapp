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
  default?: string | number | boolean; // 기본값
  select?: selectType[]; // 해당 배열의 값 중에서만 값을 선택 가능
  length?: number; // 값 최대 길이
  foreign?: {
    table: COLLECTION_NAME_TYPE; // 외부 테이블 이름
    key: string; // 외부 테이블에서 참조하는 프로퍼티의 키
    display?: string; // 외부 테이블 선택시 유저가 보게 될 프로퍼티의 키
    filter?: Record<string, any>; // 같은 값인 데이터만 보여주기
  };
  isPrimary?: boolean; // 기본 키 여부
  isNotNull?: boolean; // 필수로 입력되어야 하는지 여부
  isNotVisible?: boolean; // 유저에게 보여지지 않는지 여부 (추가, 수정 모두)
  isAutoSet?: boolean; // 데이터베이스 내부에서 자동으로 입력하는지 여부
  isReadOnly?: boolean; // 유저가 읽기만 가능하고 작성하는 것은 불가능한 값
  isTextarea?: boolean; // (type: string) 문자열을 여러 줄로 받을지 여부
  isDisalbePreview?: boolean; // 테이블 뷰에서 보여주지 않고 상세 보기에서만 보여줄지 여부
};

export type selectType = { name?: string; value: any };

// 데이터베이스 컬렉션 이름
export const COLLECTION_NAME = {
  user: "user",
  bill_of_materials: "bill_of_materials",
  customer: "customer",
  group2: "group2",
  inventory: "inventory",
  list_price: "list_price",
  part_type: "part_type",
  part: "part",
  product_order: "product_order",
  transfer_in: "transfer_in",
  transfer_out: "transfer_out",
  transfer_type: "transfer_type",
  unit: "unit",
  warehouse: "warehouse",
  work_order: "work_order",
} as const;
export type COLLECTION_NAME_TYPE =
  typeof COLLECTION_NAME[keyof typeof COLLECTION_NAME];
