"use client";

import { Box, Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { parseEther } from "viem";
import { MaxButton, StyledButton, StyledTextField } from "./TokenAction.styled";

interface TokenActionProps {
  isWrap: boolean;
  balance: string;
  symbol: string;
  onSubmit: (amount: string) => void;
  isLoading: boolean;
  isBalanceLoading: boolean;
  isSuccess: boolean;
}

const TokenAction = ({
  isWrap,
  balance,
  symbol,
  onSubmit,
  isLoading,
  isBalanceLoading,
  isSuccess,
}: TokenActionProps) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setAmount("");
      setError("");
    }
  }, [isSuccess]);

  const validateAmount = useCallback((value: string, balance: string, symbol: string) => {
    if (!value) {
      setError("");
      return;
    }

    try {
      const parsedAmount = parseEther(value);
      const parsedBalance = parseEther(balance);

      if (parsedAmount > parsedBalance) {
        setError(`Insufficient ${symbol} balance`);
      } else {
        setError("");
      }
    } catch (e) {
      setError("Invalid amount");
    }
  }, []);

  const handleAmountChange = (value: string) => {
    setAmount(value);
    validateAmount(value, balance, symbol);
  };

  const handleMaxClick = () => {
    setAmount(balance);
    validateAmount(balance, balance, symbol);
  };

  const handleSubmit = useCallback(
    (amount: string, balance: string, symbol: string) => {
      if (!amount) {
        setError("Amount is required");
        return;
      }

      try {
        const parsedAmount = parseEther(amount);
        const parsedBalance = parseEther(balance);

        if (parsedAmount > parsedBalance) {
          setError(`Insufficient ${symbol} balance`);
          return;
        }

        onSubmit(amount);
        setError("");
      } catch (e) {
        setError("Invalid amount");
      }
    },
    [, onSubmit],
  );

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#2c2f36",
        p: { xs: 2, sm: 3 },
        mb: 3,
        borderRadius: "16px",
        minHeight: { xs: "200px", sm: "168px" },
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h6"
            color="white"
            sx={{
              fontSize: { xs: "0.9rem", sm: "1.25rem" },
            }}
          >
            {isWrap ? "Wrap ETH to WETH" : "Unwrap WETH to ETH"}
          </Typography>
          <Typography
            variant="body2"
            color="gray"
            sx={{
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Balance: {isBalanceLoading ? "Loading..." : `${Number(balance).toFixed(4)} ${symbol}`}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "flex-start",
            flexDirection: { xs: "column", sm: "row" },
            "& > button": {
              width: { xs: "100%", sm: "auto" },
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              flex: 1,
              width: "100%",
              "& .MuiFormHelperText-root": {
                position: "absolute",
                bottom: -20,
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
              },
            }}
          >
            <StyledTextField
              fullWidth
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              error={!!error}
              helperText={error}
              disabled={isLoading}
              autoComplete="off"
              InputProps={{
                autoComplete: "off",
                endAdornment: (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      color: "white",
                      mr: 1,
                      height: "56px",
                    }}
                  >
                    <Typography sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}>
                      {symbol}
                    </Typography>
                    <MaxButton
                      onClick={handleMaxClick}
                      disabled={isLoading || isBalanceLoading}
                      sx={{
                        fontSize: { xs: "0.7rem", sm: "0.75rem" },
                      }}
                    >
                      MAX
                    </MaxButton>
                  </Box>
                ),
                inputProps: {
                  min: 0,
                  step: "any",
                  autoComplete: "off",
                  sx: {
                    fontSize: {
                      xs: "0.875rem",
                      sm: "1rem",
                    },
                  },
                },
              }}
            />
          </Box>
          <StyledButton
            onClick={() => handleSubmit(amount, balance, symbol)}
            disabled={isLoading || !amount || !!error || isBalanceLoading}
            sx={{
              minWidth: { xs: "100%", sm: "120px" },
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {isLoading ? "Processing..." : isWrap ? "Wrap" : "Unwrap"}
          </StyledButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default TokenAction;
