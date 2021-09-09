import { Column } from "react-table";

export type Document = Record<string, any>;

export type schemaType = {
  name: string;
  properties: Record<string, string>;
  primaryKey: string;
};

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

  for (const key in schema.properties) {
    // 제외해야 할 키일 때 다음 항목으로
    if (exclude?.includes(key)) continue;

    let type = schema.properties[key];
    let accessor: any;

    // ? 제거
    if (type.endsWith("?")) {
      type = type.replaceAll("?", "");
    }

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
