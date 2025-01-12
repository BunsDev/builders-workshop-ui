import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'viem';
import { arbitrum, optimism, sepolia } from 'wagmi/chains';

// Define chains
const chains = [
  arbitrum,
  optimism,
  ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
] as const;

// Create and export the config
export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
  transports: {
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_RPC || 'https://rpc.ankr.com/arbitrum'),
    [optimism.id]: http(process.env.NEXT_PUBLIC_OPTIMISM_RPC || 'https://rpc.ankr.com/optimism'),
  },
  ssr: true,
});
