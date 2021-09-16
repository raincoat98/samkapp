import { Column } from "react-table";

export type Document = Record<string, any>;

export type schemaType = {
  name: string;
  embedded?: boolean;
  properties: Record<string, string>;
  primaryKey: string;
};

// 예외처리
export const withCodeCollectionList = ["warehouse"];
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

// 스키마에서 react-table 헤더로 변환
export function schemaToColums(props: {
  schema: schemaType;
  exclude?: string[];
}) {
  const { schema, exclude } = props;

  const columns: Column[] = [];

  const reqProperties: any[] = [];
  const properties: any[] = [];
  for (const key in schema.properties) {
    if (Object.prototype.hasOwnProperty.call(schema.properties, key)) {
      // 제외해야 할 키일 때 다음 항목으로
      if (exclude?.includes(key)) continue;

      const type = schema.properties[key];
      if (type.endsWith("?")) {
        properties.push(key);
      } else {
        reqProperties.push(key);
      }
    }
  }

  const allProperties = reqProperties.concat(properties);

  for (let index = 0; index < allProperties.length; index++) {
    const key = allProperties[index];

    let type = schema.properties[allProperties[index]];
    // ? 제거
    if (type.endsWith("?")) {
      type = type.replaceAll("?", "");
    }

    let accessor: any;

    switch (type) {
      case "string":
      case "int": {
        accessor = key;
        break;
      }
      case "date": {
        continue;
      }
      case "objectId": {
        continue;
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
