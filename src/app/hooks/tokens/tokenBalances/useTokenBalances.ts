"use client";

import { WETH_ADDRESS } from "@/utils/constants/contracts";
import { AddressType } from "@/utils/types/shared";
import { useBalance } from "wagmi";

export const useTokenBalances = (address: string | undefined, isConnected: boolean) => {
  const {
    data: ethBalance,
    isLoading: isEthLoading,
    isRefetching: isEthRefetching,
    refetch: refetchEth,
  } = useBalance({
    address: address as AddressType,
    chainId: 11155111,
    query: {
      enabled: isConnected && !!address,
    },
  });

  const {
    data: wethBalance,
    isLoading: isWethLoading,
    isRefetching: isWethRefetching,
    refetch: refetchWeth,
  } = useBalance({
    address: address as AddressType,
    token: WETH_ADDRESS,
    chainId: 11155111,
    query: {
      enabled: isConnected && !!address,
    },
  });

  const refetchBalances = () => {
    Promise.all([refetchEth(), refetchWeth()]);
  };

  if (!address || !isConnected) {
    return {
      ethBalance: null,
      wethBalance: null,
      isLoading: false,
      refetchBalances: refetchBalances,
    };
  }

  return {
    ethBalance,
    wethBalance,
    isLoading: isEthLoading || isWethLoading || isEthRefetching || isWethRefetching,
    refetchBalances,
  };
};
