import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { COLLECTION_NAME, COLLECTION_NAME_TYPE } from "schema";

import { tb_bill_of_materials } from "schema/tb_bill_of_materials";
import { tb_customer } from "schema/tb_customer";
import { tb_group1 } from "schema/tb_group1";
import { tb_group2 } from "schema/tb_group2";
import { tb_inventory } from "schema/tb_inventory";
import { tb_manager } from "schema/tb_manager";
import { tb_list_price } from "schema/tb_list_price";
import { tb_part_type } from "schema/tb_part_type";
import { tb_part } from "schema/tb_part";
import { tb_transfer_in } from "schema/tb_transfer_in";
import { tb_transfer_out } from "schema/tb_transfer_out";
import { tb_transfer_type } from "schema/tb_transfer_type";
import { tb_unit } from "schema/tb_unit";
import { tb_warehouse } from "schema/tb_warehouse";
import { tb_work_order } from "schema/tb_work_order";

const name = "realm";
const SERVER_URL = "http://localhost:3002";

export type schemaType = {
  name: string;
  properties: Record<string, string>;
  primaryKey: string;
};

export type RealmState = {
  userName: string;
  loading: boolean;
  loggedIn: boolean;
  error: any;
  // 데이터베이스 컬렉션들
  database: {
    [COLLECTION_NAME.tb_bill_of_materials]: tb_bill_of_materials[];
    [COLLECTION_NAME.tb_customer]: tb_customer[];
    [COLLECTION_NAME.tb_group1]: tb_group1[];
    [COLLECTION_NAME.tb_group2]: tb_group2[];
    [COLLECTION_NAME.tb_inventory]: tb_inventory[];
    [COLLECTION_NAME.tb_manager]: tb_manager[];
    [COLLECTION_NAME.tb_list_price]: tb_list_price[];
    [COLLECTION_NAME.tb_part_type]: tb_part_type[];
    [COLLECTION_NAME.tb_part]: tb_part[];
    [COLLECTION_NAME.tb_transfer_in]: tb_transfer_in[];
    [COLLECTION_NAME.tb_transfer_out]: tb_transfer_out[];
    [COLLECTION_NAME.tb_transfer_type]: tb_transfer_type[];
    [COLLECTION_NAME.tb_unit]: tb_unit[];
    [COLLECTION_NAME.tb_warehouse]: tb_warehouse[];
    [COLLECTION_NAME.tb_work_order]: tb_work_order[];
  };
};

const initialState: RealmState = {
  userName: "",
  loading: false,
  loggedIn: false,
  error: undefined,
  database: {
    [COLLECTION_NAME.tb_bill_of_materials]: [],
    [COLLECTION_NAME.tb_customer]: [],
    [COLLECTION_NAME.tb_group1]: [],
    [COLLECTION_NAME.tb_group2]: [],
    [COLLECTION_NAME.tb_inventory]: [],
    [COLLECTION_NAME.tb_manager]: [],
    [COLLECTION_NAME.tb_list_price]: [],
    [COLLECTION_NAME.tb_part_type]: [],
    [COLLECTION_NAME.tb_part]: [],
    [COLLECTION_NAME.tb_transfer_in]: [],
    [COLLECTION_NAME.tb_transfer_out]: [],
    [COLLECTION_NAME.tb_transfer_type]: [],
    [COLLECTION_NAME.tb_unit]: [],
    [COLLECTION_NAME.tb_warehouse]: [],
    [COLLECTION_NAME.tb_work_order]: [],
  },
};

// 데이터베이스 자동 로그인
export const autoLogin = createAsyncThunk(`${name}/autoLogin`, async () => {
  return "테스트 유저";
});

// 데이터베이스 로그인
export const login = createAsyncThunk(
  `${name}/login`,
  async (
    props: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    const { email, password } = props;

    try {
      const response = await axios
        .get("/admin", {
          params: {
            id: email,
            password: password,
          },
        })
        .then((res) => res.data.results[0].admin_id);

      // 로그인 때에 모든 테이블  데이터 가져오기
      for (const key in COLLECTION_NAME) {
        const collectionKey = key as COLLECTION_NAME_TYPE;
        //dispatch(getData(collectionKey));
      }
      return response;
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
      // await app.currentUser?.logOut();

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
    props: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    const { email, password } = props;

    try {
      // await app.emailPasswordAuth.registerUser(email, password);
      dispatch(login({ email, password }));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 컬렉션 데이터 가져오기
export const getData = createAsyncThunk(
  `${name}/getData`,
  async (
    collectionName: COLLECTION_NAME_TYPE,
    { dispatch, rejectWithValue }
  ) => {
    try {
      let data: any[] = [];

      const response = await axios.get(`${SERVER_URL}/api/${collectionName}`);
      data = response.data.results;

      return {
        collectionName,
        data,
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
    try {
      let response: AxiosResponse<any, any>;
      let route = props.collectionName as string;

      if (route.startsWith("tb_")) route = route.replace("tb_", "");
      route = route.replaceAll("_", "-");
      response = await axios.get(`${SERVER_URL}/${route}/create`, {
        params: props.document,
      });

      await dispatch(getData(props.collectionName));
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
    try {
      let response: AxiosResponse<any, any>;
      let route = props.collectionName as string;

      if (route.startsWith("tb_")) route = route.replace("tb_", "");
      route = route.replaceAll("_", "-");
      response = await axios.get(`${SERVER_URL}/${route}/update`, {
        params: props.update,
      });

      await dispatch(getData(props.collectionName));
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
    props: { collectionName: COLLECTION_NAME_TYPE; ids: string[] },
    { dispatch, rejectWithValue }
  ) => {
    // const { collectionName, ids } = props;

    // const filter = {
    //   _id: { $in: ids },
    // };

    try {
      // const result = await app.currentUser?.functions.actionFunc({
      //   type: "deleteData",
      //   collectionName,
      //   filter,
      // });

      // await dispatch(getData(collectionName));

      // return result;
      return;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 컬렉션 특정값 추출
export const distinct = createAsyncThunk(
  `${name}/distinct`,
  async (
    props: {
      collectionName: COLLECTION_NAME_TYPE;
      field: string;
      query?: Record<string, any>;
      options?: object;
    },
    { rejectWithValue }
  ) => {}
);

const userSlice = createSlice({
  name,
  initialState,
  reducers: {},
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
      .addCase(login.rejected.type, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.loggedIn = false;
        state.error = action.payload;
      })
      // 로그아웃
      .addCase(logout.fulfilled.type, (state) => {
        state.loading = false;
        state.loggedIn = false;
        state.userName = "";
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
      // 컬렉션 특정값 추출
      .addCase(distinct.fulfilled.type, (state) => {
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

const { reducer } = userSlice;
export default reducer;
