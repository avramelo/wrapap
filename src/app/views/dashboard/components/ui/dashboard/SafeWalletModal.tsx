"use client";

import { AddressType } from "@/utils/types/shared";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAccount, useReadContract } from "wagmi";

const SAFE_ABI = [
  {
    inputs: [],
    name: "getOwners",
    outputs: [{ type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

interface SafeWalletModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (safeAddress: string) => void;
}

const SafeWalletModal = ({ open, onClose, onConfirm }: SafeWalletModalProps) => {
  const { address } = useAccount();
  const [safeAddress, setSafeAddress] = useState("");

  const { data: owners, isLoading } = useReadContract({
    address: (safeAddress.length === 42 ? safeAddress : "0x0") as AddressType,
    abi: SAFE_ABI,
    functionName: "getOwners",
  });

  const isOwner = safeAddress.length === 42 && owners?.includes(address as AddressType);

  const handleConfirm = () => {
    if (isOwner) {
      onConfirm(safeAddress);
      setSafeAddress("");
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
          outline: "none",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Connect Safe Wallet
        </Typography>
        <TextField
          label="Safe Address"
          value={safeAddress}
          onChange={(e) => setSafeAddress(e.target.value)}
          fullWidth
          error={safeAddress.length === 42 && !isOwner}
          helperText={
            safeAddress.length === 42 && !isOwner ? "You are not an owner of this Safe" : ""
          }
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!isOwner || isLoading}
          fullWidth
        >
          {isLoading ? "Checking..." : "Confirm"}
        </Button>
      </Box>
    </Modal>
  );
};

export default SafeWalletModal;
