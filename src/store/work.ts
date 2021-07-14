import { createSlice } from "@reduxjs/toolkit";

type machine = {
  name: string;
  condition: string;
  place: string;
  orderCode: string;
  client: string;
  progress: number;
  estimate: number;
};

export type WorkOrderState = {
  machineList: machine[];
};

const initialState: WorkOrderState = {
  machineList: [
    {
      name: "장비 1",
      condition: "정상",
      place: "공장 1",
      orderCode: "P202100001",
      client: "샘터",
      progress: 80.0,
      estimate: 30,
    },
    {
      name: "장비 2",
      condition: "정상",
      place: "공장 2",
      orderCode: "P202100001",
      client: "샘터",
      progress: 80.0,
      estimate: 30,
    },
  ],
};

const userSlice = createSlice({
  name: "work",
  initialState,
  reducers: {},
});

const { reducer } = userSlice;
export default reducer;
