"use client";

import { Button, TextField, styled } from "@mui/material";

export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#191b1f",
    borderRadius: "16px",
    height: "56px",
    color: "white",
    "& fieldset": {
      borderColor: "#2c2f36",
    },
    "&:hover fieldset": {
      borderColor: "#40444f",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2172e5",
    },
    "&.Mui-error fieldset": {
      borderColor: "#ff4343",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#ff4343",
  },
});

export const MaxButton = styled(Button)({
  backgroundColor: "#2c2f36",
  color: "#2172e5",
  minWidth: "44px",
  padding: "4px 8px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#40444f",
  },
});

export const StyledButton = styled(Button)({
  backgroundColor: "#2172e5",
  color: "white",
  borderRadius: "16px",
  padding: "16px 24px",
  "&:hover": {
    backgroundColor: "#1a5bb6",
  },
  "&:disabled": {
    backgroundColor: "#40444f",
    color: "#666",
  },
});
