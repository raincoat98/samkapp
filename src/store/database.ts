import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type databaseState = Record<string, any[]>;

const initialState: databaseState = {};

const userSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<{ key: string; data: any[] }>) {
      const { key, data } = action.payload;
      state[key] = data;
    },
  },
});

const { reducer, actions } = userSlice;
export const { setData } = actions;
export default reducer;
