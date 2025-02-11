"use client";

import { useNotifications } from "@/app/hooks/base/useNotifications";
import { AUTH_CONFIG } from "@/utils/constants/auth";
import { NotificationSeverity } from "@/utils/types/notifications";
import { signIn, useSession } from "next-auth/react";
import { useCallback } from "react";
import { SiweMessage } from "siwe";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

interface UseWalletAuthProps {
  onError: (error: string) => void;
  onSignStart: () => void;
  onSignEnd: () => void;
}

export const useWalletAuth = ({ onError, onSignStart, onSignEnd }: UseWalletAuthProps) => {
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { address, isConnected, status, connector } = useAccount();
  const { status: sessionStatus } = useSession();
  const { addNotification } = useNotifications();

  const isLoading =
    status === "reconnecting" ||
    status === "connecting" ||
    sessionStatus === "loading" ||
    connector?.isConnecting;

  const handleSign = useCallback(async () => {
    if (!address || status !== "connected") return;

    try {
      onSignStart();
      const nonce = await fetch("/api/auth/nonce").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch nonce");
        return res.text();
      });

      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: AUTH_CONFIG.SIGN_MESSAGE,
        uri: window.location.origin,
        version: AUTH_CONFIG.VERSION,
        chainId: AUTH_CONFIG.CHAIN_ID,
        nonce,
      });

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      const result = await signIn("web3", {
        message: JSON.stringify(message),
        signature,
        redirect: false,
      });

      if (result?.error) {
        addNotification({
          text: "Authentication failed. Please try again.",
          severity: NotificationSeverity.ERROR,
        });
        disconnect();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      addNotification({
        text: "Error during sign in",
        severity: NotificationSeverity.ERROR,
      });
      onError(errorMessage);
      console.error("Error during sign in:", errorMessage);
    } finally {
      onSignEnd();
    }
  }, [
    signMessageAsync,
    disconnect,
    address,
    status,
    addNotification,
    onSignStart,
    onSignEnd,
    onError,
  ]);

  return {
    isConnected,
    status,
    isLoading,
    isDisconnected: status === "disconnected",
    handleSign,
    address,
  };
};
