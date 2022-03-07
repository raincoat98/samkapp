import {
  extendTheme,
  ThemeConfig,
  ThemeComponents,
  ColorMode,
} from "@chakra-ui/react";

// 고대비
export const highContrastColor = { light: "black", dark: "white" };
export const highContrastBfColor = { light: "white", dark: "black" };

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

export const sidebarMenuSelected = { light: "white", dark: "gray.600" };

const config: ThemeConfig = {
  initialColorMode: "system",
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
        fontWeight: "meduim",
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

  // 탭
  Tabs: {
    parts: ["tablist", "tab"],
    baseStyle: {
      tablist: {
        display: "flex",
        overflow: "auto",
      },
      tab: {
        wordBreak: "keep-all",
      },
    },
    variants: {
      "solid-rounded": (props) => ({
        tablist: {
          padding: 1,
          borderBottomWidth: 1,
          borderColor: getColorModeValue(props.colorMode, borderColor),
        },
        tab: {
          borderWidth: 1,
          borderColor: getColorModeValue(props.colorMode, borderColor),
          borderRadius: 5,
          _notLast: {
            marginRight: 1,
          },
        },
      }),
    },
  },

  Table: {
    baseStyle: (props) => ({
      thead: {
        userSelect: "none",
      },
    }),
    variants: {
      solid: (props) => ({
        baseStyle: {
          bgColor: getColorModeValue(props.colorMode, tableBgColor),
          wordBreak: "break-all",
        },
        thead: {
          position: "sticky",
          top: 0,
          zIndex: "docked",
        },
        th: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          whiteSpace: "pre",
          margin: 0,
          padding: 2,
          overflow: "hidden",
          color: getColorModeValue(props.colorMode, highContrastColor),
          bgColor: getColorModeValue(props.colorMode, tableHeaderBgColor),
          borderColor: getColorModeValue(props.colorMode, borderColor),
          _notFirst: { borderLeftWidth: 1 },
          _hover: {
            bgColor: getColorModeValue(
              props.colorMode,
              tableHeaderBgColorHover
            ),
          },
        },
        tr: {
          bgColor: getColorModeValue(props.colorMode, tableRowBgColor),
          _even: {
            bgColor: getColorModeValue(props.colorMode, tableRowBgColorStriped),
          },
          _hover: {
            bgColor: getColorModeValue(props.colorMode, tableRowBgColorHover),
          },
        },
        td: {
          display: "block",
          margin: 0,
          padding: 2,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          textAlign: "center",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          borderColor: getColorModeValue(props.colorMode, borderColor),
          borderBottomWidth: 1,
          _notFirst: { borderLeftWidth: 1 },
        },
      }),
    },
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
