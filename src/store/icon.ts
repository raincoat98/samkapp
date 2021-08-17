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
  AiFillPrinter,
  AiOutlineSearch,
} from "react-icons/ai";
import { FiExternalLink, FiSun, FiMoon } from "react-icons/fi";
import { HiIdentification, HiKey } from "react-icons/hi";
import { IoBusinessOutline } from "react-icons/io5";
import { BsCircleFill } from "react-icons/bs";
import { FaSort, FaSortUp, FaSortDown, FaPhoneAlt } from "react-icons/fa";

export type IconState = {
  sort: IconType;
  sortUp: IconType;
  sortDown: IconType;

  externalLink: IconType;

  lightMode: IconType;
  darkMode: IconType;

  id: IconType;
  password: IconType;

  search: IconType;

  circle: IconType;
  menu: IconType;
  profile: IconType;
  container: IconType;
  setting: IconType;
  user: IconType;
  chart: IconType;
  desktop: IconType;
  bussiness: IconType;
  fax: IconType;
  phone: IconType;
};

const initialState: IconState = {
  sort: FaSort,
  sortUp: FaSortUp,
  sortDown: FaSortDown,

  externalLink: FiExternalLink,

  lightMode: FiSun,
  darkMode: FiMoon,

  id: HiIdentification,
  password: HiKey,

  search: AiOutlineSearch,

  circle: BsCircleFill,
  menu: AiOutlineMenu,
  profile: AiOutlineProfile,
  container: AiOutlineContainer,
  setting: AiOutlineSetting,
  user: AiOutlineUser,
  chart: AiOutlinePieChart,
  desktop: AiOutlineDesktop,
  bussiness: IoBusinessOutline,
  fax: AiFillPrinter,
  phone: FaPhoneAlt,
};

const userSlice = createSlice({
  name: "icon",
  initialState,
  reducers: {},
});

const { reducer } = userSlice;
export default reducer;
