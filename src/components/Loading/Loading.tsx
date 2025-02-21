import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loading = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      minHeight: "100px",
      alignItems: "center",
    }}
  >
    <CircularProgress />
  </Box>
);
