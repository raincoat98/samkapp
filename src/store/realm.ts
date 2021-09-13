import * as RealmWeb from "realm-web";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MongoDBRealmError } from "realm-web";

const name = "realm";
const APP_ID = "samkapp-dzval";
const MONGO_CLIENT = "mongodb-atlas";
const DATABASE_NAME = "database";
const app = new RealmWeb.App({ id: APP_ID });

function realmErrorToObject(realmError: MongoDBRealmError | any) {
  const errorObject: RealmError = {
    error: realmError.error,
    errorCode: realmError.errorCode,
    statusCode: realmError.statusCode,
    message: realmError.message,
  };
  return errorObject;
}

export type RealmError = {
  error: string;
  errorCode: string;
  statusCode: number;
  message: string;
};

export type schemaType = {
  name: string;
  properties: Record<string, string>;
  primaryKey: string;
};

export type RealmState = {
  userName: string;
  loading: boolean;
  loggedIn: boolean;
  error: RealmError | null;
  database: Record<string, any[]>;
  readonlySchemaKeyList: string[];
  disabledSchemaKeyList: string[];
};

const initialState: RealmState = {
  userName: "",
  loading: false,
  loggedIn: false,
  error: null,
  database: {},
  readonlySchemaKeyList: ["create_by", "create_dttm", "save_by", "save_dttm"],
  disabledSchemaKeyList: ["owner_id"],
};

// 데이터베이스 자동 로그인
export const autoLogin = createAsyncThunk(`${name}/autoLogin`, async () => {
  if (app.currentUser) {
    return app.currentUser.profile.email;
  } else {
    return;
  }
});

// 데이터베이스 로그인
export const login = createAsyncThunk(
  `${name}/login`,
  async (props: { email: string; password: string }, { rejectWithValue }) => {
    const { email, password } = props;

    const credentials = RealmWeb.Credentials.emailPassword(email, password);

    try {
      await app.logIn(credentials);
    } catch (error) {
      return rejectWithValue(realmErrorToObject(error));
    }

    return app.currentUser?.profile.email;
  }
);

// 데이터베이스 로그아웃
export const logout = createAsyncThunk(
  `${name}/logout`,
  async (undefinded, { dispatch, rejectWithValue }) => {
    try {
      await app.currentUser?.logOut();

      dispatch({
        type: `${name}/removeUser`,
      });
      return;
    } catch (error) {
      return rejectWithValue(realmErrorToObject(error));
    }
  }
);

// 컬렉션 데이터 가져오기
export const setCollectionData = createAsyncThunk(
  `${name}/setCollectionData`,
  async (collectionName: string, { rejectWithValue }) => {
    try {
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
    } catch (error) {
      return rejectWithValue(realmErrorToObject(error));
    }
  }
);

// 컬렉션에 데이터 삽입
export const insertData = createAsyncThunk(
  `${name}/insertData`,
  async (
    props: { collectionName: string; document: Record<string, any> },
    { rejectWithValue }
  ) => {
    const { collectionName, document } = props;

    try {
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
    } catch (error) {
      return rejectWithValue(realmErrorToObject(error));
    }
  }
);

// 컬렉션 데이터 업데이트
export const updateData = createAsyncThunk(
  `${name}/updateData`,
  async (
    props: {
      collectionName: string;
      filter: Record<string, any>;
      update: Record<string, any>;
      options?: object;
    },
    { rejectWithValue }
  ) => {
    const { collectionName, ...params } = props;
    const { filter, update, options } = params;

    try {
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
    } catch (error) {
      return rejectWithValue(realmErrorToObject(error));
    }
  }
);

// 컬렉션 데이터 삭제
export const deleteMany = createAsyncThunk(
  `${name}/deleteMany`,
  async (
    props: { collectionName: string; ids: any[] },
    { dispatch, rejectWithValue }
  ) => {
    const { collectionName, ids } = props;

    const filter = {
      _id: { $in: ids },
    };

    try {
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
    } catch (error) {
      return rejectWithValue(realmErrorToObject(error));
    }
  }
);

// 컬렉션 특정값 추출
export const distinct = createAsyncThunk(
  `${name}/distinct`,
  async (
    props: {
      collectionName: string;
      field: string;
      query?: Document;
      options?: object;
    },
    { rejectWithValue }
  ) => {
    const { collectionName, ...params } = props;
    const { field, query, options } = params;

    try {
      const result = await app.currentUser?.functions.actionFunc({
        type: "distinct",
        collectionName,
        field,
        query,
        options: options ? options : {},
      });

      console.log("distinct", result);
      return result;
    } catch (error) {
      return rejectWithValue(realmErrorToObject(error));
    }
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
        if (documentId === id) {
          state.database[collectionName].splice(index, 1);
          break;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        // 자동 로그인
        autoLogin.fulfilled.type,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          if (action.payload) {
            state.loggedIn = true;
            state.userName = action.payload;
          }
        }
      )
      // 로그인
      .addCase(login.fulfilled.type, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.loggedIn = true;
        state.userName = action.payload;
      })
      // 로그아웃
      .addCase(logout.fulfilled.type, (state) => {
        state.loading = false;
        state.loggedIn = false;
        state.userName = "";
      })
      // 컬렉션 데이터 가져오기
      .addCase(
        setCollectionData.fulfilled.type,
        (
          state,
          action: PayloadAction<{ collectionName: string; data: any[] }>
        ) => {
          const { collectionName, data } = action.payload;
          state.database[collectionName] = data;
          state.loading = false;
        }
      )
      // 컬렉션 데이터 삽입
      .addCase(
        insertData.fulfilled.type,
        (
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
        }
      )
      // 컬렉션 데이터 업데이트
      .addCase(
        updateData.fulfilled.type,
        (
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
        }
      )
      // 컬렉션 데이터 삭제
      .addCase(deleteMany.fulfilled.type, (state) => {
        state.loading = false;
      })
      // 컬렉션 특정값 추출
      .addCase(distinct.fulfilled.type, (state) => {
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

const { reducer, actions } = userSlice;
export const { removeCollectionData } = actions;
export default reducer;
