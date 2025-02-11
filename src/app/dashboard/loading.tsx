import { Box, CircularProgress } from "@mui/material";

export default function DashboardLoading() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#131517",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ color: "#2172e5" }} />
    </Box>
  );
}
