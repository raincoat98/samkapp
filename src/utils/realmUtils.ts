import * as RealmWeb from "realm-web";
import { Column } from "react-table";
import Moment from "moment";

type Document = Record<string, any>;

type schemaType = {
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

export function schemaToColums(schema: schemaType) {
  const columns: Column[] = [];

  for (const key in schema.properties) {
    if (key === schema.primaryKey) continue;

    let type = schema.properties[key];
    let accessor: any = key;

    if (type.endsWith("?")) {
      type = type.replaceAll("?", "");
    }

    if (type === "date") {
      accessor = (d: Document) => {
        return Moment(d[key]).local().format("YYYY년 MM월 DD일 a h시 m분");
      };
    }

    // _로 시작하는 key는 유저가 수정할 수 없는 항목
    // if (!key.startsWith("_")) {
    columns.push({
      Header: key,
      accessor,
    });
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

  console.log("insert", result);
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

  console.log("update", result);
  return result;
}

export async function deleteMany(props: {
  user: RealmWeb.User;
  collectionName: string;
  filter: Document;
}) {
  const { user, collectionName, ...params } = props;
  const { filter } = params;

  const result = await user.functions.actionFunc({
    type: "deleteMany",
    collectionName,
    filter,
  });

  console.log("deleteMany", result);
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

  console.log("distinct", result);
  return result;
}
