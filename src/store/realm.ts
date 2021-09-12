import * as RealmWeb from "realm-web";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  userName: string;
  loading: boolean;
  loggedIn: boolean;
  database: Record<string, any[]>;
  readonlySchemaKeyList: string[];
  disabledSchemaKeyList: string[];
};

const initialState: RealmState = {
  userName: "",
  loading: false,
  loggedIn: false,
  database: {},
  readonlySchemaKeyList: ["create_by", "create_dttm", "save_by", "save_dttm"],
  disabledSchemaKeyList: ["owner_id"],
};

// 데이터베이스 로그인
export const login = createAsyncThunk(
  `${name}/login`,
  async (props: { email: string; password: string }, { dispatch }) => {
    const { email, password } = props;

    const credentials = RealmWeb.Credentials.emailPassword(email, password);
    await app.logIn(credentials);

    return app.currentUser?.profile.email;
  }
);

// 데이터베이스 로그아웃
export const logout = createAsyncThunk(
  `${name}/logout`,
  async (undefinded, { dispatch }) => {
    await app.currentUser?.logOut();

    dispatch({
      type: `${name}/removeUser`,
    });

    return;
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
  async (props: { collectionName: string; ids: any[] }, { dispatch }) => {
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

    const result = await app.currentUser?.functions.actionFunc({
      type: "deleteMany",
      collectionName,
      filter,
    });

    return result;
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
    removeCollectionData(
      state,
      action: PayloadAction<{
        collectionName: string;
        id: any;
      }>
    ) {
      const { collectionName, id } = action.payload;

      for (
        let index = 0;
        index < state.database[collectionName].length;
        index++
      ) {
        const documentId = state.database[collectionName][index]._id;
        if (documentId.equals(id)) {
          state.database[collectionName].splice(index, 1);
          break;
        }
      }
    },
  },
  extraReducers: {
    // 로그인
    [login.pending.type]: (state) => {
      state.loading = true;
    },
    [login.fulfilled.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.loggedIn = true;
      state.userName = action.payload;
    },
    [login.rejected.type]: (state) => {
      console.log(state);
    },

    // 로그아웃
    [logout.pending.type]: (state) => {
      state.loading = true;
    },
    [logout.fulfilled.type]: (state) => {
      state.loading = false;
      state.loggedIn = false;
      state.userName = "";
    },
    [logout.rejected.type]: (state) => {
      console.log(state);
    },

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

      state.loading = false;
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
      if (!state.database[collectionName]) {
        state.database[collectionName] = [];
      }
      state.database[collectionName] =
        state.database[collectionName].concat(document);

      state.loading = false;
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
        const id1 = state.database[collectionName][index]._id;

        for (let index2 = 0; index2 < data.length; index2++) {
          const updatedData = data[index2];
          const id2 = updatedData._id;

          if (typeof id1 === typeof id2 && id1 === id2) {
            state.database[collectionName][index] = updatedData;
          }
        }
      }

      state.loading = false;
    },
    [updateData.rejected.type]: (state) => {
      console.log(state);
    },

    // 컬렉션 데이터 삭제
    [deleteMany.pending.type]: (state) => {
      state.loading = true;
    },
    [deleteMany.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [deleteMany.rejected.type]: (state) => {
      console.log(state);
    },

    // 컬렉션 특정값 추출
    [distinct.pending.type]: (state) => {
      state.loading = true;
    },
    [distinct.fulfilled.type]: (state) => {
      state.loading = false;
    },
    [distinct.rejected.type]: (state) => {
      console.log(state);
    },
  },
});

const { reducer, actions } = userSlice;
export const { removeCollectionData } = actions;
export default reducer;
