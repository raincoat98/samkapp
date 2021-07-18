import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Heading: {
      variants: {
        "page-title": (props) => ({
          position: "sticky",
          top: "0px",
          zIndex: "docked",
          p: 3,
          borderBottomWidth: "1px",
          bg: props.colorMode === "light" ? "white" : "gray.800",
        }),
      },
    },
  },
});

export default theme;
