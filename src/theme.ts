import { extendTheme, ThemeConfig, ThemeComponents } from "@chakra-ui/react";

export const borderColor = { light: "gray.500", dark: "gray.500" };

export const modalHeaderBgColor = { light: "gray.200", dark: "gray.800" };
export const modalBgColor = { light: "white", dark: "gray.900" };

// 테이블
export const tableBgColor = { light: "gray.200", dark: "gray.900" };
export const tableHeaderBgColor = { light: "gray.200", dark: "gray.700" };
export const tableHeaderBgColorHover = { light: "white", dark: "black" };
export const tableRowBgColor = { light: "white", dark: "black" };
export const tableRowBgColorStriped = { light: "gray.100", dark: "gray.800" };
export const tableRowBgColorHover = { light: "blue.100", dark: "blue.900" };

export const menuBackground = { light: "gray.200", dark: "gray.800" };
export const contentBackground = { light: "white", dark: "gray.900" };
export const background = { light: "white", dark: "gray.800" };
export const backgroundSelected = { light: "gray.100", dark: "gray.700" };

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const inputTheme = {
  parts: ["field", "addon"],
  variants: {
    outline: (props: any) => ({
      field: {
        borderWidth: 1,
        borderColor:
          props.colorMode === "light" ? borderColor.light : borderColor.dark,
        _hover: {
          borderColor: props.colorMode === "light" ? "black" : "white",
          boxShadow: "base",
        },
        _disabled: { opacity: 0.7 },
      },
    }),
  },
};

const components: ThemeComponents = {
  Button: {
    variants: {
      solid: (props) => ({
        borderWidth: 1,
        borderColor:
          props.colorMode === "light" ? borderColor.light : borderColor.dark,
      }),
    },
  },
  Modal: {
    parts: ["hedaer", "footer"],
    baseStyle: (props) => ({
      header: {
        borderBottomWidth: 1,
        borderColor:
          props.colorMode === "light" ? borderColor.light : borderColor.dark,
      },
      footer: {
        borderTopWidth: 1,
        borderColor:
          props.colorMode === "light" ? borderColor.light : borderColor.dark,
      },
    }),
  },

  // 인풋
  FormLabel: {
    baseStyle: (props) => ({
      fontWeight: "bold",
      _disabled: {
        fontWeight: "normal",
        opacity: 0.7,
      },
    }),
  },
  Input: inputTheme,
  Select: inputTheme,
  NumberInput: inputTheme,
};

const theme = extendTheme({
  config,
  components,
});

export default theme;
