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

export type customer = {
  _id: bson.ObjectId;
  companyAddress?: string;
  companyFax?: string;
  companyName: string;
  companyPhone?: string;
  email?: string;
  name: string;
  note?: string;
  phone?: string;
  rank?: string;
  user_id: string;
};

export const customerSchema = {
  name: "customer",
  properties: {
    _id: "objectId",
    companyAddress: "string?",
    companyFax: "string?",
    companyName: "string",
    companyPhone: "string?",
    email: "string?",
    name: "string",
    note: "string?",
    phone: "string?",
    rank: "string?",
    user_id: "string",
  },
  primaryKey: "_id",
};
