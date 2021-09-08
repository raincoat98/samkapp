import * as RealmWeb from "realm-web";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ObjectId } from "bson";

const name = "realm";
const APP_ID = "samkapp-dzval";
const MONGO_CLIENT = "mongodb-atlas";
const DATABASE_NAME = "database";
const app = new RealmWeb.App({ id: APP_ID });

export type schemaType = {
  name: string;
  properties: Record<string, string>;
  primaryKey: string;
};

export type RealmState = {
  loading: boolean;
  loggedIn: boolean;
  database: Record<string, any[]>;
  readonlySchemaKeyList: string[];
  disabledSchemaKeyList: string[];
};

const initialState: RealmState = {
  loading: false,
  loggedIn: false,
  database: {},
  readonlySchemaKeyList: ["create_by", "create_dttm", "save_by", "save_dttm"],
  disabledSchemaKeyList: ["_id", "owner_id"],
};

// 데이터베이스 로그인
export const login = createAsyncThunk(
  `${name}/login`,
  async (props: { email: string; password: string }, { dispatch }) => {
    const { email, password } = props;

    const credentials = RealmWeb.Credentials.emailPassword(email, password);
    await app.logIn(credentials);

    dispatch({
      type: `${name}/setUser`,
    });
  }
);

// 컬렉션 데이터 가져오기
export const setCollectionData = createAsyncThunk(
  `${name}/setCollectionData`,
  async (collectionName: string) => {
    const mongodb = app.currentUser?.mongoClient(MONGO_CLIENT);
    const collection = mongodb
      ?.db(DATABASE_NAME)
      ?.collection<any>(collectionName);
    const data = await collection?.find();

    console.log("find", data);

    return {
      collectionName,
      data,
    };
  }
);

// 컬렉션에 데이터 삽입
export const insertData = createAsyncThunk(
  `${name}/insertData`,
  async (props: { collectionName: string; document: Record<string, any> }) => {
    const { collectionName, document } = props;

    const result = await app.currentUser?.functions.actionFunc({
      type: "insert",
      collectionName,
      doc: document,
    });

    console.log("insert", result);

    return {
      collectionName,
      document: document,
    };
  }
);

// 컬렉션 데이터 업데이트
export const updateData = createAsyncThunk(
  `${name}/updateData`,
  async (props: {
    collectionName: string;
    filter: Record<string, any>;
    update: Record<string, any>;
    options?: object;
  }) => {
    const { collectionName, ...params } = props;
    const { filter, update, options } = params;

    const result = await app.currentUser?.functions.actionFunc({
      type: "update",
      collectionName,
      filter,
      update,
      options: options ? options : {},
    });

    const mongodb = app.currentUser?.mongoClient(MONGO_CLIENT);
    const collection = mongodb
      ?.db(DATABASE_NAME)
      ?.collection<any>(collectionName);
    const data = await collection?.find(filter);

    console.log("update", result);

    return {
      collectionName,
      data,
    };
  }
);

// 컬렉션 데이터 삭제
export const deleteMany = createAsyncThunk(
  `${name}/deleteMany`,
  async (props: { collectionName: string; ids: ObjectId[] }, { dispatch }) => {
    const { collectionName, ids } = props;

    const filter = {
      _id: { $in: ids },
    };

    for (let index = 0; index < ids.length; index++) {
      dispatch({
        type: `${name}/removeCollectionData`,
        payload: { collectionName, id: ids[index] },
      });
    }

    await app.currentUser?.functions.actionFunc({
      type: "deleteMany",
      collectionName,
      filter,
    });
  }
);

// 컬렉션 특정값 추출
export const distinct = createAsyncThunk(
  `${name}/distinct`,
  async (props: {
    collectionName: string;
    field: string;
    query?: Document;
    options?: object;
  }) => {
    const { collectionName, ...params } = props;
    const { field, query, options } = params;

    const result = await app.currentUser?.functions.actionFunc({
      type: "distinct",
      collectionName,
      field,
      query,
      options: options ? options : {},
    });

    console.log("distinct", result);
    return result;
  }
);

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUser(state) {
      state.loggedIn = true;
    },
    removeUser(state) {
      state.loggedIn = false;
    },
    removeCollectionData(
      state,
      action: PayloadAction<{
        collectionName: string;
        id: ObjectId;
      }>
    ) {
      const { collectionName, id } = action.payload;

      for (
        let index = 0;
        index < state.database[collectionName].length;
        index++
      ) {
        const documentId: ObjectId = state.database[collectionName][index]._id;
        if (documentId.equals(id)) {
          state.database[collectionName].splice(index, 1);
          break;
        }
      }
    },
  },
  extraReducers: {
    // 컬렉션 데이터 가져오기
    [setCollectionData.pending.type]: (state) => {
      state.loading = true;
    },
    [setCollectionData.fulfilled.type]: (
      state,
      action: PayloadAction<{ collectionName: string; data: any[] }>
    ) => {
      const { collectionName, data } = action.payload;
      state.database[collectionName] = data;
    },
    [setCollectionData.rejected.type]: (state) => {
      console.log(state);
    },

    // 컬렉션에 데이터 삽입
    [insertData.pending.type]: (state) => {
      state.loading = true;
    },
    [insertData.fulfilled.type]: (
      state,
      action: PayloadAction<{
        collectionName: string;
        document: Record<string, any>;
      }>
    ) => {
      const { collectionName, document } = action.payload;
      console.log(action.payload);
      state.database[collectionName] =
        state.database[collectionName].concat(document);
    },
    [insertData.rejected.type]: (state) => {
      console.log(state);
    },

    // 컬렉션 데이터 업데이트
    [updateData.pending.type]: (state) => {
      state.loading = true;
    },
    [updateData.fulfilled.type]: (
      state,
      action: PayloadAction<{ collectionName: string; data: any[] }>
    ) => {
      const { collectionName, data } = action.payload;

      for (
        let index = 0;
        index < state.database[collectionName].length;
        index++
      ) {
        const id1: ObjectId = state.database[collectionName][index]._id;

        for (let index2 = 0; index2 < data.length; index2++) {
          const updatedData = data[index2];
          const id2: ObjectId = updatedData._id;

          if (id1.equals(id2)) {
            state.database[collectionName][index] = updatedData;
          }
        }
      }
    },
    [updateData.rejected.type]: (state) => {
      console.log(state);
    },

    // 컬렉션 데이터 삭제
    [deleteMany.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteMany.rejected.type]: (state) => {
      console.log(state);
    },

    // 컬렉션 특정값 추출
    [distinct.pending.type]: (state) => {
      state.loading = true;
    },
    [distinct.fulfilled.type]: (state, action: PayloadAction<any>) => {
      // const { collectionName, data } = action.payload;
      console.log(action.payload);
    },
    [distinct.rejected.type]: (state) => {
      console.log(state);
    },
  },
});

const { reducer, actions } = userSlice;
export const { setUser, removeUser, removeCollectionData } = actions;
export default reducer;
