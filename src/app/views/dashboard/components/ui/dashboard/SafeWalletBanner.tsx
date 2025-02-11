"use client";

import { Box, Typography } from "@mui/material";

interface SafeWalletBannerProps {
  safeAddress: string;
  owners: string[];
  threshold: number;
}

const SafeWalletBanner = ({ safeAddress, owners, threshold }: SafeWalletBannerProps) => {
  return (
    <Box
      sx={{
        p: 2,
        mb: 3,
        background: "linear-gradient(90deg, #2c3e50 0%, #3498db 100%)",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography sx={{ color: "#fff" }}>
        Using Safe: {safeAddress} ({threshold} of {owners.length} signatures required)
      </Typography>
    </Box>
  );
};

export default SafeWalletBanner;
