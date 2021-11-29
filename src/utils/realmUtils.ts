import { Column, Accessor } from "react-table";
import moment from "moment";
import { schemaType } from "schema";

export function isMonth(key: string) {
  return key.endsWith("month");
}

// 스키마에서 react-table 헤더로 변환
export function schemaToColums(props: {
  schema: schemaType;
  exclude?: string[];
}) {
  const { schema, exclude } = props;

  const columns: Column[] = [];

  const properties: string[] = [];
  for (const key in schema.properties) {
    // 제외해야 할 키일 때 다음 항목으로
    if (exclude?.includes(key)) continue;
    properties.push(key);
  }

  for (let index = 0; index < properties.length; index++) {
    const key = properties[index];
    const type = schema.properties[key].type;
    let accessor: string | Accessor<{}> | undefined;

    switch (type) {
      case "string":
      case "number": {
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
      }
      case "boolean": {
        accessor = (originalRow) => {
          const origRow = originalRow as Record<string, any>;
          const boolData = origRow[key] as boolean;
          switch (boolData) {
            case true:
              return "예";
            default:
              return "아니오";
          }
        };
        break;
      }
    }

    columns.push({
      Header: key,
      accessor,
    });
  }

  return columns;
}
