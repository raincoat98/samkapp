import { Dispatch } from "@reduxjs/toolkit";
import * as RealmWeb from "realm-web";
import { Column } from "react-table";
import Moment from "moment";

export type Document = Record<string, any>;

export type schemaType = {
  name: string;
  properties: Record<string, string>;
  primaryKey: string;
};

export type useProgress = { useProgress?: boolean; dispatch?: Dispatch<any> };
export type user = { user: RealmWeb.User };
export type collectionName = { collectionName: string };
export type basicProps = useProgress & user & collectionName;

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
    if (!key.startsWith("_")) {
      columns.push({
        Header: key,
        accessor,
      });
    }
  }

  return columns;
}

export function getCollection(props: {
  app: Realm.App | null;
  collectionName: string;
}) {
  const { app, collectionName } = props;

  const mongodb = app?.currentUser?.mongoClient("mongodb-atlas");
  return mongodb?.db("database")?.collection<any>(collectionName);
}

export async function find(props: {
  collection: Realm.Services.MongoDB.MongoDBCollection<any>;
}) {
  const { collection } = props;

  return await collection.find();
}

export async function insert(
  props: basicProps & {
    document: Document;
  }
) {
  const { useProgress, dispatch, user, collectionName, ...params } = props;
  const { document } = params;

  if (useProgress) setProgress(dispatch, true);

  const result = await user.functions.actionFunc({
    type: "insert",
    collectionName,
    document,
  });

  if (useProgress) setProgress(dispatch, false);

  console.log("insert", result);
  return result;
}

export async function update(
  props: basicProps & {
    filter: Document;
    update: Document;
    options?: object;
  }
) {
  const { useProgress, dispatch, user, collectionName, ...params } = props;
  const { filter, update, options } = params;

  if (useProgress) setProgress(dispatch, true);

  const result = await user.functions.actionFunc({
    type: "update",
    collectionName,
    filter,
    update,
    options: options ? options : {},
  });

  if (useProgress) setProgress(dispatch, false);

  console.log("update", result);
  return result;
}

export async function deleteMany(
  props: basicProps & {
    filter: Document;
  }
) {
  const { useProgress, dispatch, user, collectionName, ...params } = props;
  const { filter } = params;

  if (useProgress) setProgress(dispatch, true);

  const result = await user.functions.actionFunc({
    type: "deleteMany",
    collectionName,
    filter,
  });

  if (useProgress) setProgress(dispatch, false);

  console.log("deleteMany", result);
  return result;
}

export async function distinct(
  props: basicProps & {
    field: string;
    query?: Document;
    options?: object;
  }
) {
  const { useProgress, dispatch, user, collectionName, ...params } = props;
  const { field, query, options } = params;

  if (useProgress) setProgress(dispatch, true);

  const result = await user.functions.actionFunc({
    type: "distinct",
    collectionName,
    field,
    query,
    options: options ? options : {},
  });

  if (useProgress) setProgress(dispatch, false);

  console.log("distinct", result);
  return result;
}

function setProgress(dispatch?: Dispatch, active?: boolean) {
  if (!dispatch || active === undefined) return;

  if (active) {
    dispatch({
      type: "system/openProgress",
    });
  } else {
    dispatch({
      type: "system/closeProgress",
    });
  }
}
