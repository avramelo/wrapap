import { Box, Paper } from "@mui/material";
import { ReactNode } from "react";

export const Card = ({
  children,
  actionButton,
}: {
  children: ReactNode;
  actionButton: ReactNode;
}) => {
  return (
    <Box sx={{ py: { xs: 3, sm: 6 }, px: { xs: 1, sm: 3, lg: 4 } }}>
      <Paper
        elevation={3}
        sx={{
          maxWidth: "md",
          mx: "auto",
          bgcolor: "background.paper",
          borderRadius: 2,
          p: { xs: 2, sm: 3 },
          "& > *:not(:last-child)": {
            mb: { xs: 1.5, sm: 2 },
          },
        }}
      >
        <Box sx={{ "& > *:not(:last-child)": { mb: { xs: 1.5, sm: 2 } } }}>{children}</Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            mt: "auto",
          }}
        >
          {actionButton}
        </Box>
      </Paper>
    </Box>
  );
};
