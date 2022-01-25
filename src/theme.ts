import {
  extendTheme,
  ThemeConfig,
  ThemeComponents,
  ColorMode,
} from "@chakra-ui/react";

export const borderColor = { light: "gray.500", dark: "gray.500" };

export const modalHeaderBgColor = { light: "gray.200", dark: "gray.800" };
export const modalBgColor = { light: "white", dark: "gray.700" };

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
        borderColor: getColorModeValue(props.colorMode, borderColor),
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
  // 버튼
  Button: {
    variants: {
      solid: (props) => ({
        borderWidth: 1,
        borderColor: getColorModeValue(props.colorMode, borderColor),
      }),
    },
  },

  // 모달
  Modal: {
    parts: ["hedaer", "body", "footer"],
    variants: {
      popup: (props) => ({
        header: {
          bgColor: getColorModeValue(props.colorMode, modalHeaderBgColor),
          borderBottomWidth: 1,
          borderColor: getColorModeValue(props.colorMode, borderColor),
        },
        body: {
          bgColor: getColorModeValue(props.colorMode, modalBgColor),
        },
        footer: {
          bgColor: getColorModeValue(props.colorMode, modalHeaderBgColor),
          borderTopWidth: 1,
          borderColor: getColorModeValue(props.colorMode, borderColor),
        },
      }),
    },
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

  // 팝오버
  Popover: {
    parts: ["header", "content"],
    baseStyle: (props) => ({
      header: {
        fontWeight: "bold",
        bgColor: getColorModeValue(props.colorMode, modalHeaderBgColor),
        borderBottomWidth: 1,
        borderColor: getColorModeValue(props.colorMode, borderColor),
      },
      content: {
        borderBottomWidth: 1,
        borderColor: getColorModeValue(props.colorMode, borderColor),
        boxShadow: "md",
      },
    }),
  },
};

function getColorModeValue(
  colorMode: ColorMode,
  colorValue: { light: string; dark: string }
) {
  return colorMode === "light" ? colorValue.light : colorValue.dark;
}

const theme = extendTheme({
  config,
  components,
});

export default theme;
