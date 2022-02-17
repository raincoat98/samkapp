import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { COLLECTION_NAME, COLLECTION_NAME_TYPE } from "schema";

import { bill_of_materials } from "schema/bill_of_materials";
import { customer } from "schema/customer";
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

type database = {
  [COLLECTION_NAME.bill_of_materials]: bill_of_materials[];
  [COLLECTION_NAME.customer]: customer[];
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

export type RealmState = {
  user: {
    user_id: string;
    name: string;
    privilege: number;
  };
  loading: boolean;
  loggedIn: boolean;
  error?: Error;
  // 데이터베이스 컬렉션들
  database: database;
  bookmarkedData: {
    [COLLECTION_NAME.part]: part[];
  };
};

const initialState: RealmState = {
  user: { user_id: "", name: "", privilege: 0 },
  loading: false,
  loggedIn: false,
  error: undefined,
  database: {
    [COLLECTION_NAME.bill_of_materials]: [],
    [COLLECTION_NAME.customer]: [],
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
  bookmarkedData: {
    [COLLECTION_NAME.part]: [],
  },
};

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
      await dispatch(getData({}));

      return response.data.result;
    } catch (error) {
      console.error(error);
      return rejectWithValue(new Error("Invalid email and password"));
    }
  }
);

// 유저 회원가입
export const register = createAsyncThunk(
  `${name}/register`,
  async (
    props: { id: string; password: string; name: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      let response: AxiosResponse<any, any>;
      response = await axios.get(`${SERVER_URL}/user/register`, {
        params: {
          user_id: props.id,
          password: props.password,
          name: props.name,
        },
      });

      if (!response.data) throw response;

      await dispatch(
        login({
          id: props.id,
          password: props.password,
        })
      );

      return response.data.result;
    } catch (error) {
      console.error(error);
      return rejectWithValue(new Error("유저 등록이 실패했습니다"));
    }
  }
);

// 컬렉션 데이터 가져오기
export const getData = createAsyncThunk(
  `${name}/getData`,
  async (
    props: {
      collectionName?: COLLECTION_NAME_TYPE;
      isBackground?: boolean;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      if (!props.isBackground) dispatch(setLoading({ loading: true }));

      let response: AxiosResponse<any, any>;

      if (props.collectionName) {
        let route = props.collectionName as string;

        route = route.replaceAll("_", "-");
        response = await axios.get(`${SERVER_URL}/${route}/all`);

        return {
          collectionName: props.collectionName,
          data: response.data.results,
        };
      } else {
        for (const key in COLLECTION_NAME) {
          const collectionName = key as COLLECTION_NAME_TYPE;
          await dispatch(
            getData({ collectionName, isBackground: props.isBackground })
          );
        }
      }
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
      // 출고시 재고 확인
      if (props.collectionName === "transfer_out") {
        const document = props.document as transfer_out;
        const qty = (await dispatch(
          runFunction({
            function_name: "get_qty",
            params: {
              inv_month: moment(new Date()).format("YYYYMM").toString(),
              part_id: document.part_id,
            },
          })
        )) as any;

        if (
          qty.payload.data.results === undefined ||
          qty.payload.data.results === null
        ) {
          throw new Error(
            "해당 품목의 재고 데이터가 존재하지 않습니다. 재고 데이터를 추가해주세요."
          );
        } else if (
          document.quantity !== undefined &&
          document.quantity > qty.payload.data.results
        ) {
          throw new RangeError("현재 재고량보다 초과되게 출고할 수 없습니다.");
        }
      }

      let response: AxiosResponse<any, any>;
      let route = props.collectionName as string;

      const params = checkValidity(props.document);

      route = route.replaceAll("_", "-");
      response = await axios.get(`${SERVER_URL}/${route}/create`, {
        params,
      });

      await dispatch(getData({}));
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

      const params = checkValidity(props.update);

      route = route.replaceAll("_", "-");
      response = await axios.get(`${SERVER_URL}/${route}/update`, {
        params,
      });

      await dispatch(getData({}));
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
    try {
      let response: AxiosResponse<any, any>;
      let route = props.collectionName as string;

      route = route.replaceAll("_", "-");
      response = await axios.delete(`${SERVER_URL}/${route}/delete`, {
        params: props.item,
      });

      await dispatch(getData({}));
      return { response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// SQL 함수 실행
export const runFunction = createAsyncThunk(
  `${name}/runFunction`,
  async (
    props: {
      function_name: string;
      params: Record<string, any>;
    },
    { dispatch, rejectWithValue }
  ) => {
    try {
      let response: AxiosResponse<any, any>;

      response = await axios.get(
        `${SERVER_URL}/functions/${props.function_name}`,
        {
          params: props.params,
        }
      );

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name,
  initialState,
  reducers: {
    // 로딩
    setLoading(
      state,
      action: PayloadAction<{
        loading: boolean;
      }>
    ) {
      return {
        ...state,
        loading: action.payload.loading,
      };
    },
    // 로그아웃
    logout(state) {
      return {
        ...state,
        error: undefined,
        loading: false,
        loggedIn: false,
        // 유저 정보 제거
        user: {
          user_id: "",
          name: "",
          privilege: 0,
        },
        // 데이터베이스 삭제
        database: {
          [COLLECTION_NAME.bill_of_materials]: [],
          [COLLECTION_NAME.customer]: [],
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
    },
    // 페이지 새로고침
    onPageRefresh(state) {
      return {
        ...state,
        error: undefined,
        loading: false,
      };
    },
    removeError(state) {
      return {
        ...state,
        error: undefined,
      };
    },
    setBookmarkData(
      state,
      action: PayloadAction<{
        partItem: part;
      }>
    ) {
      const bookmarkedPartList = [...state.bookmarkedData.part];
      bookmarkedPartList.push(action.payload.partItem);

      return {
        ...state,
        bookmarkedData: {
          ...state.bookmarkedData,
          part: bookmarkedPartList,
        },
      };
    },
    removeBookmarkData(
      state,
      action: PayloadAction<{
        partItem: part;
      }>
    ) {
      const bookmarkedPartList = state.bookmarkedData.part.filter(
        (part) => action.payload.partItem.part_id !== part.part_id
      );

      return {
        ...state,
        bookmarkedData: {
          ...state.bookmarkedData,
          part: bookmarkedPartList,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // 로그인
      .addCase(login.fulfilled.type, (state, action: PayloadAction<user>) => {
        return {
          ...state,
          loading: false,
          loggedIn: true,
          user: {
            user_id: action.payload.user_id,
            name: action.payload.name,
            privilege: action.payload.privilege,
          },
        };
      })

      // 데이터 가져오기
      .addCase(getData.pending.type, () => {}) // 백그라운드 새로고침 시에 loading 방지용
      .addCase(
        getData.fulfilled.type,
        (
          state,
          action: PayloadAction<
            | {
                collectionName: COLLECTION_NAME_TYPE;
                data: any[];
              }
            | undefined
          >
        ) => {
          if (action.payload) {
            const { collectionName, data } = action.payload;
            if (Array.isArray(data)) {
              return {
                ...state,
                loading: false,
                database: {
                  ...state.database,
                  [collectionName]: data,
                },
              };
            } else {
              return {
                ...state,
                loading: false,
              };
            }
          }
        }
      )

      // 작업 종료시 실행
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction<Error>) => {
          console.error(action.payload);
          return {
            ...state,
            loading: false,
            error: action.payload,
          };
        }
      )

      // 기본 작업
      .addDefaultCase((state, action) => {
        // 작업 시작
        if (action.type.endsWith("/pending")) {
          return {
            ...state,
            loading: true,
            error: undefined,
          };
          // 작업 성공
        } else if (action.type.endsWith("/fulfilled")) {
          return {
            ...state,
            loading: false,
          };
        }
      });
  },
});

function checkValidity(data: Record<string, any>) {
  const validatedData: Record<string, any> = {};
  for (const key in data) {
    let value = data[key];
    // DB에서 bool 타입을 인식하지 못하므로 타입 변환
    if (typeof value === "boolean") value = Number(value);
    validatedData[key] = value;
  }
  return validatedData;
}

const { reducer, actions } = userSlice;
export const {
  setLoading,
  logout,
  onPageRefresh,
  removeError,
  setBookmarkData,
  removeBookmarkData,
} = actions;
export default reducer;
