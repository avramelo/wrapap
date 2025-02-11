"use client";

import { Box, Button, Modal, Typography } from "@mui/material";

interface DisconnectSafeModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DisconnectSafeModal = ({ open, onClose, onConfirm }: DisconnectSafeModalProps) => {
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
          Switch to EOA Wallet
        </Typography>
        <Typography sx={{ mb: 3 }}>
          Are you sure you want to disconnect from Safe wallet and switch back to EOA wallet?
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DisconnectSafeModal;
