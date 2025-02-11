"use client";

import { Box, Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const DashboardHeader = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      justifyContent: "space-between",
      alignItems: { xs: "stretch", sm: "center" },
      gap: { xs: 2, sm: 0 },
      mb: 4,
    }}
  >
    <Typography
      variant="h4"
      color="white"
      sx={{
        fontSize: { xs: "1.5rem", sm: "2rem" },
        textAlign: { xs: "center", sm: "left" },
      }}
    >
      Wrap/Unwrap
    </Typography>
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "center", sm: "flex-end" },
      }}
    >
      <ConnectButton />
    </Box>
  </Box>
);

export default DashboardHeader;
