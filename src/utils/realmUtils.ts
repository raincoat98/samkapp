import { Column } from "react-table";

type schemaType = {
  name: string;
  properties: Record<string, string>;
  primaryKey: string;
};

export function schemaToColums(schema: schemaType) {
  const columns: Column[] = [];

  for (const key in schema.properties) {
    if (!schema.properties[key].startsWith("objectId")) {
      columns.push({
        Header: key,
        accessor: key,
      });
    }
  }

  return columns;
}
