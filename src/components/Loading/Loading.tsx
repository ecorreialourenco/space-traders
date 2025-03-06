import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

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
