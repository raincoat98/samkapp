import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { COLLECTION_NAME, COLLECTION_NAME_TYPE } from "utils/realmUtils";
import * as realmObjectModes from "realmObjectModes";

const name = "realm";

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
    [COLLECTION_NAME.tb_customer_mngr]: realmObjectModes.customer_mngr[];
    [COLLECTION_NAME.tb_customer]: realmObjectModes.customer[];
    [COLLECTION_NAME.tb_inventory]: realmObjectModes.inv[];
    [COLLECTION_NAME.tb_group1]: realmObjectModes.part[];
    [COLLECTION_NAME.tb_group2]: realmObjectModes.part_group_1[];
    [COLLECTION_NAME.tb_part_list_price]: realmObjectModes.part_group_2[];
    [COLLECTION_NAME.tb_part_type]: realmObjectModes.part_price[];
    [COLLECTION_NAME.tb_part]: realmObjectModes.part_type[];
    [COLLECTION_NAME.tb_warehouse]: realmObjectModes.warehouse[];
    [COLLECTION_NAME.tb_work_order]: realmObjectModes.work_order[];
  };
  // 제작 가능 재고
  maxMadeQty: Record<string, number>;
};

const initialState: RealmState = {
  userName: "",
  loading: false,
  loggedIn: false,
  error: undefined,
  database: {
    tb_customer_mngr: [],
    tb_customer: [],
    tb_inventory: [],
    tb_group1: [],
    tb_group2: [],
    tb_part_list_price: [],
    tb_part_type: [],
    tb_part: [],
    tb_warehouse: [],
    tb_work_order: [],
  },
  maxMadeQty: {},
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
    // const { email, password } = props;

    // const credentials = RealmWeb.Credentials.emailPassword(email, password);

    try {
      // await app.logIn(credentials);

      // 로그인 때에 모든 테이블  데이터 가져오기
      for (const key in COLLECTION_NAME) {
        const collectionKey = key as COLLECTION_NAME_TYPE;
        dispatch(getData(collectionKey));
      }
    } catch (error) {
      return rejectWithValue(error);
    }

    return props.email;
    // return app.currentUser?.profile.email;
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

      const apiRoute = collectionName.replace("tb_", "");
      const response = await axios.get(`http://localhost:3002/api/${apiRoute}`);
      data = response.data.results;

      // dispatch({
      //   type: `${name}/computeQty`,
      // });

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
    // const { collectionName, document } = props;

    try {
      // await app.currentUser?.functions.actionFunc({
      //   type: "insert",
      //   collectionName,
      //   doc: document,
      // });

      await dispatch(getData(props.collectionName));

      // dispatch({
      //   type: `${name}/computeQty`,
      // });

      return;
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
      filter: { _id: string };
      update: Record<string, any>;
      options?: object;
    },
    { dispatch, rejectWithValue }
  ) => {
    // const { collectionName, ...params } = props;
    // const { filter, update, options } = params;

    try {
      // await app.currentUser?.functions.actionFunc({
      //   type: "update",
      //   collectionName,
      //   filter,
      //   update,
      //   options: options ? options : {},
      // });
      // const mongodb = app.currentUser?.mongoClient(MONGO_CLIENT);
      // const collection = mongodb
      //   ?.db(DATABASE_NAME)
      //   ?.collection<any>(collectionName);
      // const data = await collection?.find(filter);
      // dispatch({
      //   type: `${name}/computeQty`,
      // });
      // return {
      //   collectionName,
      //   data,
      // };
      return;
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

      // dispatch({
      //   type: `${name}/computeQty`,
      // });

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
  reducers: {
    // 현재 재고로 만들 수 있는 품목 계산
    computeQty(state) {
      // const partDB = state.database.part;
      // const invDB = state.database.inv;
      // for (let index = 0; index < partDB.length; index++) {
      //   const part = partDB[index];
      //   const bomList = part.bills_of_material;
      //   let maxQuantity = 0;
      //   let quantityList: number[] = [];
      //   if (Array.isArray(bomList)) {
      //     for (let index = 0; index < bomList.length; index++) {
      //       const bom = bomList[index];
      //       const bomNum = bom.number;
      //       const stock = invDB.filter((inv) => {
      //         if (inv.part_id) {
      //           let partId = inv.part_id as unknown as ObjectId;
      //           // 문자열이라면 ObjectId로 캐스팅
      //           if (typeof partId === "string") partId = new ObjectId(partId);
      //           return partId.equals(bom.part_id);
      //         } else return false;
      //       })[0]?.inv_qty;
      //       if (stock) quantityList.push(Math.floor(stock / bomNum));
      //     }
      //   }
      //   if (quantityList.length) {
      //     maxQuantity = Math.min(...quantityList);
      //     if (part._id) state.maxMadeQty[part.code] = maxQuantity;
      //   }
      // }
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
        getData.fulfilled.type,
        (
          state,
          action: PayloadAction<{
            collectionName: COLLECTION_NAME_TYPE;
            data: any[];
          }>
        ) => {
          const { collectionName, data } = action.payload;
          state.database[collectionName] = data;
          state.loading = false;
        }
      )
      .addCase(insertData.fulfilled.type, (state) => {
        state.loading = false;
      })
      // 컬렉션 데이터 업데이트
      .addCase(
        updateData.fulfilled.type,
        (
          state,
          action: PayloadAction<{
            collectionName: COLLECTION_NAME_TYPE;
            data: (Record<string, any> & { _id: string })[];
          }>
        ) => {
          // const { collectionName, data } = action.payload;

          // for (
          //   let index = 0;
          //   index < state.database[collectionName].length;
          //   index++
          // ) {
          //   const id1 = state.database[collectionName][index]._id;

          //   for (let index2 = 0; index2 < data.length; index2++) {
          //     const updatedData = data[index2];
          //     const id2 = updatedData._id;

          //     if (id1.equals(id2)) {
          //       state.database[collectionName][index] = updatedData as any;
          //     }
          //   }
          // }

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

const { reducer, actions } = userSlice;
export const { computeQty } = actions;
export default reducer;
