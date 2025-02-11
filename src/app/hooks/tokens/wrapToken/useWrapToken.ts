"use client";

import { useNotifications } from "@/app/hooks/base/useNotifications";
import { useEOATokenActions } from "@/app/hooks/eoa/useEOATokenActions";
import { useSafeTransaction } from "@/app/hooks/safe/useSafeTransactions";
import { NotificationSeverity } from "@/utils/types/notifications";
import { useCallback, useEffect } from "react";

export const useWrapToken = (refetchBalances: () => void) => {
  const { addNotification } = useNotifications();
  const {
    executeSafeTransaction,
    transactionReceipt: SafeWallTransactionReceipt,
    isLoading: isSafeLoading,
    isSuccess: isSafeSuccess,
    isError: isSafeError,
  } = useSafeTransaction();
  const {
    handleAction: handleEOAAction,
    transactionReceipt,
    isLoading: isEOALoading,
    isSuccess: isEOASuccess,
    isError: isEOAError,
  } = useEOATokenActions();

  const handleAction = useCallback(
    async (isWrap: boolean, amount: string, safeAddress: string | null) => {
      try {
        if (safeAddress) {
          await executeSafeTransaction(isWrap, amount, safeAddress);
        } else {
          await handleEOAAction(isWrap, amount);
        }
      } catch (error) {
        console.error("Token action failed:", error);
      }
    },
    [executeSafeTransaction, handleEOAAction],
  );

  useEffect(() => {
    if (transactionReceipt) {
      addNotification({
        text: "Transaction successful",
        severity: NotificationSeverity.SUCCESS,
      });
      refetchBalances();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionReceipt]);

  useEffect(() => {
    if (SafeWallTransactionReceipt) {
      addNotification({
        text: "Transaction successful",
        severity: NotificationSeverity.SUCCESS,
      });
      refetchBalances();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SafeWallTransactionReceipt]);

  return {
    isLoading: isEOALoading || isSafeLoading,
    handleAction,
    isError: isEOAError || isSafeError,
    isSuccess: isEOASuccess || isSafeSuccess,
  };
};
