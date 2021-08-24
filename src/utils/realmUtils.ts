import * as RealmWeb from "realm-web";
import { Column } from "react-table";

type Document = { [key: string]: any };

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

export async function insert(props: {
  user: RealmWeb.User;
  collectionName: string;
  document: Document;
}) {
  const { user, collectionName, ...params } = props;
  const { document } = params;

  const result = await user.functions.actionFunc({
    type: "insert",
    collectionName,
    document,
  });

  return result;
}

export async function update(props: {
  user: RealmWeb.User;
  collectionName: string;
  filter: Document;
  update: Document;
  options?: object;
}) {
  const { user, collectionName, ...params } = props;
  const { filter, update, options } = params;

  const result = await user.functions.actionFunc({
    type: "update",
    collectionName,
    filter,
    update,
    options: options ? options : {},
  });

  return result;
}

export async function distinct(props: {
  user: RealmWeb.User;
  collectionName: string;
  field: string;
  query?: Document;
  options?: object;
}) {
  const { user, collectionName, ...params } = props;
  const { field, query, options } = params;

  const result = await user.functions.actionFunc({
    type: "distinct",
    collectionName,
    field,
    query,
    options: options ? options : {},
  });

  return result;
}
