"use client";

import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box
      component="div"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#131517",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ color: "#2172e5" }} size={40} />
    </Box>
  );
};
