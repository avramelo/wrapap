"use client";

import { useAuthRedirect } from "@/app/authentication/hooks/useAuthRedirect";
import { useWalletAuth } from "@/app/authentication/hooks/useWalletAuth";
import { Loading } from "@/app/components/Loading";
import { Card } from "@/app/components/ui/Card/Card";
import { useNotifications } from "@/app/hooks/base/useNotifications";
import { NotificationSeverity } from "@/utils/types/notifications";
import { Box, Container, Typography } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Suspense, useEffect, useState } from "react";
import { useAccount } from "wagmi";

const HomeContent = () => {
  const { addNotification } = useNotifications();
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { address, isConnected } = useAccount();
  const { session, isLoading } = useAuthRedirect("/dashboard");
  const { handleSign } = useWalletAuth({
    onError: setError,
    onSignStart: () => setIsSigningIn(true),
    onSignEnd: () => setIsSigningIn(false),
  });

  useEffect(() => {
    if (error) {
      addNotification({
        text: error ?? "Something went wrong during authentication, please try again.",
        severity: NotificationSeverity.WARNING,
        duration: 10000,
      });
      setError(null);
    }
  }, [error, addNotification]);

  useEffect(() => {
    if (isConnected && address && !isSigningIn && !session) {
      handleSign();
    }
  }, [isConnected, address, handleSign, isSigningIn, session]);

  return (
    <Suspense fallback={<Loading />} key={isSigningIn || isLoading ? "loading" : "loaded"}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#131517",
          display: "flex",
          alignItems: "center",
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Card actionButton={<ConnectButton />}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: { xs: 3, sm: 4 },
                textAlign: "center",
                py: { xs: 2, sm: 3 },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "1.75rem", sm: "2.5rem" },
                  lineHeight: 1.2,
                  maxWidth: "90%",
                  mb: { xs: 1, sm: 2 },
                }}
              >
                Welcome to Wrap App
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  maxWidth: "350px",
                  mx: "auto",
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  lineHeight: 1.6,
                }}
              >
                Connect your wallet to start wrapping and unwrapping ETH
              </Typography>
              {error && (
                <Typography
                  sx={{
                    color: "error.main",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    mt: 2,
                  }}
                >
                  {error}
                </Typography>
              )}
            </Box>
          </Card>
        </Container>
      </Box>
    </Suspense>
  );
};

export default HomeContent;
