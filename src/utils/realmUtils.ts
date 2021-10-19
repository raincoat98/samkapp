import { Column, Accessor } from "react-table";
import moment from "moment";

// 데이터베이스 컬렉션 이름
export const COLLECTION_NAME = {
  customer: "customer",
  customer_mngr: "customer_mngr",
  inv: "inv",
  part: "part",
  part_group_1: "part_group_1",
  part_group_2: "part_group_2",
  part_price: "part_price",
  part_type: "part_type",
  warehouse: "warehouse",
  work_order: "work_order",
} as const;
export type COLLECTION_NAME_TYPE =
  typeof COLLECTION_NAME[keyof typeof COLLECTION_NAME];

export type schemaType = {
  name: string;
  embedded?: boolean;
  properties: Record<string, string>;
  primaryKey: string;
};

// 예외처리
export const textAreaSchemaKeyList = ["remark"];
export const readonlySchemaKeyList = [
  "create_by",
  "create_dttm",
  "save_by",
  "save_dttm",
];
export const disabledSchemaKeyList = ["owner_id"];

export function isReadOnly(key: string) {
  return key.startsWith("_");
}

export function isRequired(type: string) {
  return !type.endsWith("?");
}

export function isMonth(key: string) {
  return key.endsWith("month");
}

// 정렬값
export const sortData: Record<string, Record<string, number>> = {
  customer: {
    address: 1,
    zip_code: 2,
  },
  inv: {
    adequate_stock: 5,
    inv_month: 1,
    inv_qty: 3,
    lot_no: 7,
    part_id: 2,
    rev_inv_qty: 4,
    warehouse_id: 6,
  },
  part: {
    part_group_2_id: 3,
    part_name: 1,
    part_type_id: 2,
    remark: 6,
    unit: 4,
    warehouse_id: 5,
  },
  part_price: {
    part_id: 0,
    purchase_price: 1,
    os_price: 2,
    selling_price: 3,
    apply_start: 4,
    apply_end: 5,
  },
};

// 스키마에서 react-table 헤더로 변환
export function schemaToColums(props: {
  schema: schemaType;
  exclude?: string[];
}) {
  const { schema, exclude } = props;

  const columns: Column[] = [];

  const reqProperties: string[] = [];
  const properties: string[] = [];
  for (const key in schema.properties) {
    // 제외해야 할 키일 때 다음 항목으로
    if (exclude?.includes(key)) continue;

    const type = schema.properties[key];
    if (isRequired(type)) reqProperties.push(key);
    else properties.push(key);
  }

  const allProperties = reqProperties.concat(properties);

  // 정렬 데이터에 값이 존재할 때만
  if (sortData[props.schema.name]) {
    allProperties.sort((property1, property2) => {
      const a = sortData[props.schema.name][property1] ?? 99,
        b = sortData[props.schema.name][property2] ?? 99;
      return a - b;
    });
  }

  for (let index = 0; index < allProperties.length; index++) {
    const key = allProperties[index];
    const type = schema.properties[allProperties[index]].replaceAll("?", "");
    let accessor: string | Accessor<{}>;

    switch (type) {
      case "string":
      case "int": {
        accessor = key;
        break;
      }
      case "date": {
        accessor = (originalRow) => {
          const origRow = originalRow as Record<string, any>;
          return origRow[key]
            ? isMonth(key)
              ? moment(origRow[key]).format("YYYY-MM") // 년월
              : moment(origRow[key]).format("YYYY-MM-DD") // 년월일
            : "";
        };
        break;
        // continue;
      }
      default: {
        continue;
      }
    }

    columns.push({
      Header: key,
      accessor,
    });
  }

  return columns;
}
