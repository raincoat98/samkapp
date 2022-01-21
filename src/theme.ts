import { extendTheme, ThemeConfig, ThemeComponents } from "@chakra-ui/react";

export const borderColor = { light: "gray.500", dark: "gray.500" };

export const modalHeaderBgColor = { light: "gray.200", dark: "gray.800" };

// 테이블
export const tableBgColor = { light: "gray.200", dark: "gray.900" };
export const tableHeaderBgColor = { light: "gray.200", dark: "gray.800" };
export const tableHeaderBgColorHover = { light: "white", dark: "black" };
export const tableRowBgColor = { light: "white", dark: "black" };
export const tableRowBgColorStriped = { light: "gray.100", dark: "gray.900" };
export const tableRowBgColorHover = { light: "blue.100", dark: "blue.900" };

export const menuBackground = { light: "gray.200", dark: "gray.800" };
export const contentBackground = { light: "white", dark: "gray.900" };
export const background = { light: "white", dark: "gray.800" };
export const backgroundSelected = { light: "gray.100", dark: "gray.700" };

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
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
};

const theme = extendTheme({
  config,
  components,
});

export default theme;
