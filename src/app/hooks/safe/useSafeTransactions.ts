"use client";

import { useNotifications } from "@/app/hooks/base/useNotifications";
import { WETH_ABI } from "@/utils/constants/abi";
import { WETH_ADDRESS } from "@/utils/constants/contracts";
import { NotificationSeverity } from "@/utils/types/notifications";
import { AddressType } from "@/utils/types/shared";
import Safe from "@safe-global/protocol-kit";
import { OperationType } from "@safe-global/safe-core-sdk-types";
import { useCallback, useState } from "react";
import { encodeFunctionData, parseEther } from "viem";
import { useAccount, useWaitForTransactionReceipt, useWalletClient } from "wagmi";

interface SafeTransaction {
  to: string;
  value: string;
  data: string;
}

export const useSafeTransaction = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isError, setIsError] = useState(false);
  const [hash, setHash] = useState<AddressType | undefined>();
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const {
    data: transactionReceipt,
    isLoading: isTransactionReceiptLoading,
    isError: isErrorTransactionReceipt,
    isSuccess: isSuccessTransactionReceipt,
  } = useWaitForTransactionReceipt({ hash });

  const executeSafeTransaction = useCallback(
    async (isWrap: boolean, amount: string, safeAddress: string) => {
      const transaction: SafeTransaction = {
        to: WETH_ADDRESS,
        value: isWrap ? parseEther(amount).toString() : "0",
        data: isWrap
          ? encodeFunctionData({ abi: WETH_ABI, functionName: "deposit" })
          : encodeFunctionData({
              abi: WETH_ABI,
              functionName: "withdraw",
              args: [parseEther(amount)],
            }),
      };
      if (!address || !walletClient || !safeAddress) return null;

      try {
        setIsError(false);
        setIsLoading(true);
        const safe = await Safe.init({
          provider: walletClient as any,
          signer: address,
          safeAddress,
        });

        // Create transaction
        const safeTransaction = await safe.createTransaction({
          transactions: [
            {
              to: transaction.to,
              value: transaction.value,
              data: transaction.data,
              operation: OperationType.Call,
            },
          ],
          options: {
            nonce: await safe.getNonce(),
            safeTxGas: "0",
          },
        });

        // Sign the transaction
        const signedSafeTx = await safe.signTransaction(safeTransaction);

        // Execute transaction
        const receipt = await safe.executeTransaction(signedSafeTx);

        addNotification({
          text: "Transaction submitted",
          severity: NotificationSeverity.SUCCESS,
          duration: 5000,
        });

        setHash(receipt.hash as AddressType);
        return receipt;
      } catch (error) {
        console.warn("Safe transaction failed:", error);
        const message = error instanceof Error ? error.message : "Transaction failed";
        setIsError(true);
        addNotification({
          text: message.includes("User rejected")
            ? "Transaction was rejected by user"
            : message.includes("GS013")
              ? "Transaction signature validation failed"
              : message.includes("Insufficient WETH")
                ? "Insufficient WETH balance in Safe wallet"
                : "Transaction failed. Please try again",
          severity: NotificationSeverity.WARNING,
          duration: 5000,
        });

        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [address, walletClient, addNotification],
  );

  return {
    isLoading: isTransactionReceiptLoading || isLoading,
    executeSafeTransaction,
    transactionReceipt,
    isError: isErrorTransactionReceipt || isError,
    isSuccess: isSuccessTransactionReceipt,
  };
};
