import * as bson from "bson";

export type product = {
  _id: bson.ObjectId;
  name: string;
  note?: string;
  standard?: number;
  stock: number;
  thickness?: number;
  user_id?: string;
  width?: string;
};

export const productSchema = {
  name: "product",
  properties: {
    _id: "objectId",
    name: "string",
    note: "string?",
    standard: "int?",
    stock: "int",
    thickness: "int?",
    user_id: "string?",
    width: "string?",
  },
  primaryKey: "_id",
};
