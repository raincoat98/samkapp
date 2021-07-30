import { createSlice } from "@reduxjs/toolkit";
import { Column } from "react-table";

type machine = {
  name: string;
  condition: string;
  place: string;
  orderCode: string;
  client: string;
  progress: number;
  estimate: number;
};

// 도구
type toolType = {
  name: string;
  size: string;
  description: string;
};

// 목형
type wooden = toolType & {
  thickness: string;
};

// 적치대
type stash = toolType & {};

// 조판지
type typesettingPaper = toolType & {
  thickness: string;
  width: string;
  length: string;
};

// 조판지 걸이
type typesettingPaperHanger = toolType & {};

export type WorkState = {
  columnsList: {
    wooden: Column[];
    stash: Column[];
    typesettingPaper: Column[];
    typesettingPaperHanger: Column[];
  };
  woodenList: wooden[];
  stashList: stash[];
  typesettingPaperList: typesettingPaper[];
  typesettingPaperHangerList: typesettingPaperHanger[];
  machineList: machine[];
};

const initialState: WorkState = {
  columnsList: {
    wooden: [
      {
        Header: "목형 이름",
        accessor: "name",
      },
      {
        Header: "사이즈",
        accessor: "size",
      },
      {
        Header: "설명",
        accessor: "description",
      },
      {
        Header: "두께",
        accessor: "thickness",
      },
    ],
    stash: [
      {
        Header: "적치대 이름",
        accessor: "name",
      },
      {
        Header: "설명",
        accessor: "description",
      },
    ],
    typesettingPaper: [
      {
        Header: "조판지 이름",
        accessor: "name",
      },
      {
        Header: "사이즈",
        accessor: "size",
      },
      {
        Header: "설명",
        accessor: "description",
      },
    ],
    typesettingPaperHanger: [
      {
        Header: "조판지 걸이 이름",
        accessor: "name",
      },
      {
        Header: "설명",
        accessor: "description",
      },
    ],
  },
  woodenList: [],
  stashList: [],
  typesettingPaperList: [],
  typesettingPaperHangerList: [],
  machineList: [],
};

const userSlice = createSlice({
  name: "work",
  initialState,
  reducers: {},
});

const { reducer } = userSlice;
export default reducer;
