import { createSlice } from "@reduxjs/toolkit";
import { IconType } from "react-icons";
import {
  AiOutlineMenu,
  AiOutlineProfile,
  AiOutlineContainer,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlinePieChart,
  AiOutlineDesktop,
  AiOutlineCaretUp,
  AiOutlineCaretDown,
} from "react-icons/ai";
import { IoBusinessOutline } from "react-icons/io5";
import { BsCircleFill } from "react-icons/bs";

export type IconState = {
  up: IconType;
  down: IconType;
  circle: IconType;
  menu: IconType;
  profile: IconType;
  container: IconType;
  setting: IconType;
  user: IconType;
  chart: IconType;
  desktop: IconType;
  bussiness: IconType;
};

const initialState: IconState = {
  up: AiOutlineCaretUp,
  down: AiOutlineCaretDown,
  circle: BsCircleFill,
  menu: AiOutlineMenu,
  profile: AiOutlineProfile,
  container: AiOutlineContainer,
  setting: AiOutlineSetting,
  user: AiOutlineUser,
  chart: AiOutlinePieChart,
  desktop: AiOutlineDesktop,
  bussiness: IoBusinessOutline,
};

const userSlice = createSlice({
  name: "icon",
  initialState,
  reducers: {},
});

const { reducer } = userSlice;
export default reducer;
