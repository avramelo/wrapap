"use client";

import DashboardContent from "@/app/views/dashboard/components/DashboardContent";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useWalletInit } from "../authentication/hooks/useWalletInit";
import { Loading } from "../components/Loading";

export default function DashboardPage() {
  const { isConnected, status, isLoading: isWalletLoading } = useWalletInit();
  const router = useRouter();
  const [isPendingDisconnect, setIsPendingDisconnect] = useState(false);

  const isLoading = isWalletLoading || isPendingDisconnect;

  useEffect(() => {
    const handleAuthState = async () => {
      if (!isLoading) {
        if (!isConnected && status === "disconnected") {
          setIsPendingDisconnect(true);
          await signOut({ redirect: false });
          router.replace("/");
          return;
        }
      }
    };

    handleAuthState();
  }, [isConnected, status, isLoading, router]);

  return (
    <Suspense fallback={<Loading />}>
      <DashboardContent />
    </Suspense>
  );
}
