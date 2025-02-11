import { useNotifications } from "@/app/hooks/base/useNotifications";
import { useWriteContract } from "@/app/hooks/base/useWriteContract";
import { WETH_ABI } from "@/utils/constants/abi";
import { WETH_ADDRESS } from "@/utils/constants/contracts";
import { NotificationSeverity } from "@/utils/types/notifications";
import { useCallback } from "react";
import { parseEther } from "viem";

export const useEOATokenActions = () => {
  const { addNotification } = useNotifications();
  const { writeContract, isLoading, isSuccess, transactionReceipt, isError } = useWriteContract();

  const handleAction = useCallback(
    async (isWrap: boolean, amount: string) => {
      try {
        const transactionConfig = isWrap
          ? {
              address: WETH_ADDRESS,
              abi: WETH_ABI,
              functionName: "deposit",
              args: isWrap ? [] : [parseEther(amount).toString()],
              value: parseEther(amount).toString(),
            }
          : {
              address: WETH_ADDRESS,
              abi: WETH_ABI,
              functionName: "withdraw",
              args: isWrap ? [] : [parseEther(amount).toString()],
            };
        const result = await writeContract(transactionConfig as any);
        addNotification({
          text: "Transaction submitted",
          severity: NotificationSeverity.SUCCESS,
          duration: 5000,
        });
        return result;
      } catch (error) {
        console.error("EOA action failed:", error);
        throw error;
      }
    },
    [writeContract, addNotification],
  );

  return {
    handleAction,
    isLoading,
    isSuccess,
    isError,
    transactionReceipt,
  };
};
