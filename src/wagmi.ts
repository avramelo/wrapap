import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

const projectId = "eb6bad3d16bf37431bb5ebd93fed1b01";

export const config = getDefaultConfig({
  appName: "Wrap App",
  projectId,
  chains: [sepolia],
  ssr: true,
});
