import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { COLLECTION_NAME, COLLECTION_NAME_TYPE } from "schema";

import { bill_of_materials } from "schema/bill_of_materials";
import { customer } from "schema/customer";
import { group1 } from "schema/group1";
import { group2 } from "schema/group2";
import { inventory } from "schema/inventory";
import { list_price } from "schema/list_price";
import { part } from "schema/part";
import { part_type } from "schema/part_type";
import { product_order } from "schema/product_order";
import { transfer_in } from "schema/transfer_in";
import { transfer_out } from "schema/transfer_out";
import { transfer_type } from "schema/transfer_type";
import { unit } from "schema/unit";
import { user } from "schema/user";
import { warehouse } from "schema/warehouse";
import { work_order } from "schema/work_order";

const name = "realm";
const SERVER_URL = "http://localhost:3002";

export type schemaType = {
  name: string;
  properties: Record<string, string>;
  primaryKey: string;
};

export type historyType = {
  name: string;
  props: any;
};

export type RealmState = {
  history: historyType[];
  user: {
    name: string;
  };
  loading: boolean;
  loggedIn: boolean;
  error: any;
  // 데이터베이스 컬렉션들
  database: {
    [COLLECTION_NAME.bill_of_materials]: bill_of_materials[];
    [COLLECTION_NAME.customer]: customer[];
    [COLLECTION_NAME.group1]: group1[];
    [COLLECTION_NAME.group2]: group2[];
    [COLLECTION_NAME.inventory]: inventory[];
    [COLLECTION_NAME.list_price]: list_price[];
    [COLLECTION_NAME.part_type]: part_type[];
    [COLLECTION_NAME.part]: part[];
    [COLLECTION_NAME.product_order]: product_order[];
    [COLLECTION_NAME.transfer_in]: transfer_in[];
    [COLLECTION_NAME.transfer_out]: transfer_out[];
    [COLLECTION_NAME.transfer_type]: transfer_type[];
    [COLLECTION_NAME.unit]: unit[];
    [COLLECTION_NAME.user]: user[];
    [COLLECTION_NAME.warehouse]: warehouse[];
    [COLLECTION_NAME.work_order]: work_order[];
  };
};

const initialState: RealmState = {
  history: [],
  user: { name: "" },
  loading: false,
  loggedIn: false,
  error: undefined,
  database: {
    [COLLECTION_NAME.bill_of_materials]: [],
    [COLLECTION_NAME.customer]: [],
    [COLLECTION_NAME.group1]: [],
    [COLLECTION_NAME.group2]: [],
    [COLLECTION_NAME.inventory]: [],
    [COLLECTION_NAME.list_price]: [],
    [COLLECTION_NAME.part_type]: [],
    [COLLECTION_NAME.part]: [],
    [COLLECTION_NAME.product_order]: [],
    [COLLECTION_NAME.transfer_in]: [],
    [COLLECTION_NAME.transfer_out]: [],
    [COLLECTION_NAME.transfer_type]: [],
    [COLLECTION_NAME.unit]: [],
    [COLLECTION_NAME.user]: [],
    [COLLECTION_NAME.warehouse]: [],
    [COLLECTION_NAME.work_order]: [],
  },
};

// 데이터베이스 자동 로그인
export const autoLogin = createAsyncThunk(
  `${name}/autoLogin`,
  async (props, { dispatch }) => {
    // 로그인 때에 모든 테이블  데이터 가져오기
    for (const key in COLLECTION_NAME) {
      const collectionName = key as COLLECTION_NAME_TYPE;
      await dispatch(getData({ collectionName }));
    }
    return "테스트 유저";
  }
);

// 데이터베이스 로그인
export const login = createAsyncThunk(
  `${name}/login`,
  async (
    props: { id: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    const { id, password } = props;
    try {
      let response: AxiosResponse<any, any>;
      response = await axios.get(`${SERVER_URL}/user/login`, {
        params: {
          user_id: id,
          password,
        },
      });

      if (!response.data) throw response;

      // 로그인 때에 모든 테이블  데이터 가져오기
      for (const key in COLLECTION_NAME) {
        const collectionName = key as COLLECTION_NAME_TYPE;
        await dispatch(getData({ collectionName }));
      }

      return response.data.result;
    } catch (error) {
      return rejectWithValue(new Error("Invalid email and password"));
    }
  }
);

// 데이터베이스 로그아웃
export const logout = createAsyncThunk(
  `${name}/logout`,
  async (undefinded, { dispatch, rejectWithValue }) => {
    try {
      dispatch({
        type: `${name}/removeUser`,
      });
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 데이터베이스 회원가입
export const register = createAsyncThunk(
  `${name}/register`,
  async (
    props: { id: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    const { id, password } = props;
    try {
      dispatch(login({ id, password }));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 컬렉션 데이터 가져오기
export const getData = createAsyncThunk(
  `${name}/getData`,
  async (
    props: {
      collectionName: COLLECTION_NAME_TYPE;
    },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(
      addHistory({
        name: "getData",
        props,
      })
    );

    try {
      let response: AxiosResponse<any, any>;
      let route = props.collectionName as string;

      route = route.replaceAll("_", "-");
      response = await axios.get(`${SERVER_URL}/${route}/all`);

      return {
        collectionName: props.collectionName,
        data: response.data.results,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 컬렉션에 데이터 삽입
export const insertData = createAsyncThunk(
  `${name}/insertData`,
  async (
    props: {
      collectionName: COLLECTION_NAME_TYPE;
      document: Record<string, any>;
    },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(
      addHistory({
        name: "insertData",
        props,
      })
    );

    try {
      let response: AxiosResponse<any, any>;
      let route = props.collectionName as string;

      route = route.replaceAll("_", "-");
      response = await axios.get(`${SERVER_URL}/${route}/create`, {
        params: props.document,
      });

      await dispatch(getData({ collectionName: props.collectionName }));
      return { response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 컬렉션 데이터 업데이트
export const updateData = createAsyncThunk(
  `${name}/updateData`,
  async (
    props: {
      collectionName: COLLECTION_NAME_TYPE;
      filter: Record<string, string>;
      update: Record<string, any>;
    },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(
      addHistory({
        name: "updateData",
        props,
      })
    );

    try {
      let response: AxiosResponse<any, any>;
      let route = props.collectionName as string;

      route = route.replaceAll("_", "-");
      response = await axios.get(`${SERVER_URL}/${route}/update`, {
        params: props.update,
      });

      await dispatch(getData({ collectionName: props.collectionName }));
      return { response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 컬렉션 데이터 삭제
export const deleteData = createAsyncThunk(
  `${name}/deleteData`,
  async (
    props: {
      collectionName: COLLECTION_NAME_TYPE;
      item: Record<string, any>;
    },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(
      addHistory({
        name: "deleteData",
        props,
      })
    );

    console.log(props);

    try {
      let response: AxiosResponse<any, any>;
      let route = props.collectionName as string;

      route = route.replaceAll("_", "-");
      response = await axios.delete(`${SERVER_URL}/${route}/delete`, {
        params: props.item,
      });

      await dispatch(getData({ collectionName: props.collectionName }));
      console.log(response);
      return { response };
    } catch (error) {
      console.log(error);

      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    addHistory(state, action: PayloadAction<historyType>) {
      state.history.push(action.payload);
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
            state.user.name = action.payload;
          }
        }
      )
      // 로그인
      .addCase(login.fulfilled.type, (state, action: PayloadAction<user>) => {
        console.log(action.payload);

        state.loading = false;
        state.loggedIn = true;
        state.user.name = action.payload.name;
      })
      .addCase(login.rejected.type, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = action.payload;
      })
      // 로그아웃
      .addCase(logout.fulfilled.type, (state) => {
        state.loading = false;
        state.loggedIn = false;
        state.user.name = "";
      })
      // 컬렉션 데이터 가져오기
      .addCase(
        getData.fulfilled.type,
        (
          state,
          action: PayloadAction<{
            collectionName: COLLECTION_NAME_TYPE;
            data: any[];
          }>
        ) => {
          const { collectionName, data } = action.payload;
          if (Array.isArray(data)) state.database[collectionName] = [...data];
          state.loading = false;
        }
      )
      .addCase(
        insertData.fulfilled.type,
        (
          state,
          action: PayloadAction<{ response: AxiosResponse<any, any> }>
        ) => {
          console.log(action.payload.response);
          state.loading = false;
        }
      )
      // 컬렉션 데이터 업데이트
      .addCase(
        updateData.fulfilled.type,
        (
          state,
          action: PayloadAction<{ response: AxiosResponse<any, any> }>
        ) => {
          console.log(action.payload.response);
          state.loading = false;
        }
      )
      // 컬렉션 데이터 삭제
      .addCase(deleteData.fulfilled.type, (state) => {
        state.loading = false;
      })

      // 작업 시작시 실행
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      // 작업 종료시 실행
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction<any>) => {
          console.error(action.payload);
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

const { reducer, actions } = userSlice;
export const { addHistory } = actions;
export default reducer;
