import React from "react";
import { Box, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

function Progress() {
  return (
    <Box>
      <CircularProgress isIndeterminate color="green.300" />
    </Box>
  );
}

export default Progress;