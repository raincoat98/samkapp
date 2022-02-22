// 동적 테마
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type themeState = {
  padding: {
    table: number;
  };
};

const initialState: themeState = {
  padding: {
    table: 2,
  },
};

const userSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setPaddingTableValue(state, action: PayloadAction<number>) {
      return {
        ...state,
        padding: {
          ...state.padding,
          table: action.payload,
        },
      };
    },
    reset(state) {
      return {
        ...initialState,
      };
    },
  },
});

const { reducer, actions } = userSlice;
export const { setPaddingTableValue, reset } = actions;
export default reducer;
