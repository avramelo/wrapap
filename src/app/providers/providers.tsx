"use client";

import { NotificationsProvider } from "@/app/providers/notifications/NotificationProvider";
import { config } from "@/wagmi";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { WagmiProvider } from "wagmi";

const theme = createTheme();
const client = new QueryClient();

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to my APP",
});

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <WagmiProvider config={config}>
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <NotificationsProvider>
                <RainbowKitProvider>{children}</RainbowKitProvider>
              </NotificationsProvider>
            </ThemeProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </SessionProvider>
    </WagmiProvider>
  );
}
