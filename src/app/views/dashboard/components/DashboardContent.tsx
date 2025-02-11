"use client";

import { useLocalStorage } from "@/app/hooks/base/useLocalStorage";
import { useSafeInfo } from "@/app/hooks/safe/useSafeInfo";
import { useTokenBalances } from "@/app/hooks/tokens/tokenBalances/useTokenBalances";
import { useWrapToken } from "@/app/hooks/tokens/wrapToken/useWrapToken";
import { Box, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { useAccount } from "wagmi";
import TokenAction from "./TokenAction/TokenAction";
import DashboardHeader from "./ui/dashboard/DashboardHeader";
import DisconnectSafeModal from "./ui/dashboard/DisconnectSafeModal";
import SafeWalletBanner from "./ui/dashboard/SafeWalletBanner";
import SafeWalletModal from "./ui/dashboard/SafeWalletModal";

const DashboardContent = () => {
  const [showSafeModal, setShowSafeModal] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [safeInfo, setSafeInfo] = useState<{ owners: string[]; threshold: number } | null>(null);

  const { address, isConnected } = useAccount();
  const { getSafeInfo } = useSafeInfo();
  const {
    value: safeAddress,
    setValue: setSafeAddress,
    removeValue: removeSafeAddress,
  } = useLocalStorage<string | null>("safeAddress", null);

  const {
    ethBalance,
    wethBalance,
    isLoading: isBalancesLoading,
    refetchBalances,
  } = useTokenBalances(safeAddress ?? address, isConnected);
  const { isLoading, isSuccess, handleAction } = useWrapToken(refetchBalances);

  useEffect(() => {
    if (safeAddress) {
      getSafeInfo(safeAddress).then(setSafeInfo);
    }
  }, [getSafeInfo, safeAddress]);

  const handleSafeConfirm = async (address: string) => {
    setSafeAddress(address);
    const info = await getSafeInfo(address);
    setSafeInfo(info);
    setShowSafeModal(false);
    refetchBalances();
  };

  const handleDisconnectSafe = () => {
    removeSafeAddress();
    setSafeInfo(null);
    setShowDisconnectModal(false);
    refetchBalances();
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#131517" }}>
      <Container maxWidth="md" sx={{ py: 3 }}>
        <DashboardHeader />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          {safeAddress ? (
            <Button
              variant="outlined"
              onClick={() => setShowDisconnectModal(true)}
              sx={{ borderColor: "#2172e5", color: "white" }}
            >
              Use EOA Wallet
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => setShowSafeModal(true)}
              sx={{ bgcolor: "#2172e5", "&:hover": { bgcolor: "#1a5bb6" } }}
            >
              Use Safe Wallet
            </Button>
          )}
        </Box>

        {/* Safe Wallet Info */}
        {safeAddress && safeInfo && (
          <SafeWalletBanner
            safeAddress={safeAddress}
            owners={safeInfo.owners}
            threshold={safeInfo.threshold}
          />
        )}

        {/* Token Actions */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TokenAction
            isWrap={true}
            balance={ethBalance ? formatEther(ethBalance.value) : "0"}
            symbol="ETH"
            onSubmit={(amount) => handleAction(true, amount, safeAddress ?? null)}
            isLoading={isLoading}
            isBalanceLoading={isBalancesLoading}
            isSuccess={isSuccess}
          />

          <TokenAction
            isWrap={false}
            balance={wethBalance ? formatEther(wethBalance.value) : "0"}
            symbol="WETH"
            onSubmit={(amount) => handleAction(false, amount, safeAddress ?? null)}
            isLoading={isLoading}
            isBalanceLoading={isBalancesLoading}
            isSuccess={isSuccess}
          />
        </Box>

        {/* Modals */}
        <SafeWalletModal
          open={showSafeModal}
          onClose={() => setShowSafeModal(false)}
          onConfirm={handleSafeConfirm}
        />

        <DisconnectSafeModal
          open={showDisconnectModal}
          onClose={() => setShowDisconnectModal(false)}
          onConfirm={handleDisconnectSafe}
        />
      </Container>
    </Box>
  );
};

export default DashboardContent;
