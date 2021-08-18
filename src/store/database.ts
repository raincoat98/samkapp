import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { Column } from "react-table";

type id = { id?: string };
type note = { note?: string };
type stock = { stock: number };

// 고객
type customer = id &
  note & {
    companyName: string;
    managerName: string;
    contact: string;
    fax: string;
    address: string;
    id: string;
  };
type vendor = customer;

// 재고
type typesettingPaper = id &
  stock &
  note & {
    standard: string;
    thickness: string;
    location: string;
  };
type pawn = id &
  stock &
  note & {
    width: string;
    thickness: string;
    location: string;
  };
type hookPawn = id &
  stock &
  note & {
    width: string;
    thickness: string;
    location: string;
  };
type plain = id &
  stock &
  note & {
    width: string;
    thickness: string;
    location: string;
  };

export type databaseState = {
  headers: {
    typesettingPaper: Column<{}>[];
    pawn: Column<{}>[];
    hookPawn: Column<{}>[];
    plain: Column<{}>[];
  };
  customer: customer[];
  vendor: vendor[];
  inventory: {
    typesettingPaper: typesettingPaper[];
    pawn: pawn[];
    hookPawn: hookPawn[];
    plain: plain[];
  };
};

const initialState: databaseState = {
  headers: {
    typesettingPaper: [
      {
        Header: "규격",
        accessor: "standard",
      },
      {
        Header: "두께",
        accessor: "thickness",
      },
      {
        Header: "현재고",
        accessor: "stock",
      },
      {
        Header: "위치",
        accessor: "location",
      },
      {
        Header: "비고",
        accessor: "note",
      },
    ],
    pawn: [
      {
        Header: "폭",
        accessor: "width",
      },
      {
        Header: "두께",
        accessor: "thickness",
      },
      {
        Header: "현재고",
        accessor: "stock",
      },
      {
        Header: "위치",
        accessor: "location",
      },
      {
        Header: "비고",
        accessor: "note",
      },
    ],
    hookPawn: [
      {
        Header: "폭",
        accessor: "width",
      },
      {
        Header: "두께",
        accessor: "thickness",
      },
      {
        Header: "현재고",
        accessor: "stock",
      },
      {
        Header: "위치",
        accessor: "location",
      },
      {
        Header: "비고",
        accessor: "note",
      },
    ],
    plain: [
      {
        Header: "폭",
        accessor: "width",
      },
      {
        Header: "두께",
        accessor: "thickness",
      },
      {
        Header: "현재고",
        accessor: "stock",
      },
      {
        Header: "위치",
        accessor: "location",
      },
      {
        Header: "비고",
        accessor: "note",
      },
    ],
  },
  customer: [],
  vendor: [],
  inventory: {
    typesettingPaper: [],
    pawn: [],
    hookPawn: [],
    plain: [],
  },
};

const workOrderSlice = createSlice({
  name: "database",
  initialState,
  reducers: {
    // 추가
    addCustomer(state, action: PayloadAction<customer>) {
      const customer = Object.assign({}, action.payload);
      customer.id = uuidv4();
      state.customer = [...state.customer, customer];
    },
    addVendor(state, action: PayloadAction<vendor>) {
      const vendor = Object.assign({}, action.payload);
      vendor.id = uuidv4();
      state.vendor = [...state.vendor, vendor];
    },
    // 재고
    addTypesettingPaper(state, action: PayloadAction<typesettingPaper>) {
      const typesettingPaper = Object.assign({}, action.payload);
      typesettingPaper.id = uuidv4();
      state.inventory.typesettingPaper = [
        ...state.inventory.typesettingPaper,
        typesettingPaper,
      ];
    },
    addPawn(state, action: PayloadAction<pawn>) {
      const pawn = Object.assign({}, action.payload);
      pawn.id = uuidv4();
      state.inventory.pawn = [...state.inventory.pawn, pawn];
    },
    addHookPawn(state, action: PayloadAction<hookPawn>) {
      const hookPawn = Object.assign({}, action.payload);
      hookPawn.id = uuidv4();
      state.inventory.hookPawn = [...state.inventory.hookPawn, hookPawn];
    },
    addPlain(state, action: PayloadAction<plain>) {
      const plain = Object.assign({}, action.payload);
      plain.id = uuidv4();
      state.inventory.plain = [...state.inventory.plain, plain];
    },

    // 삭제
    deleteCustomer(state, action: PayloadAction<customer["id"]>) {
      state.customer = state.customer.filter(
        (customerObject) => customerObject.id !== action.payload
      );
    },
    deleteVendor(state, action: PayloadAction<vendor["id"]>) {
      state.vendor = state.vendor.filter(
        (vendorObject) => vendorObject.id !== action.payload
      );
    },
  },
});

const { reducer, actions } = workOrderSlice;
export const { addCustomer, addVendor, deleteCustomer, deleteVendor } = actions;
export default reducer;
