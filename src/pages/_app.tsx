// pages/_app.tsx  (Next.js pages router, TypeScript)
import type { AppProps } from 'next/app';
import { WagmiProvider, createConfig } from 'wagmi';
import { metaMask } from '@wagmi/connectors';
import {
  configureChains,
  publicProvider,
  jsonRpcProvider,
} from '@wagmi/core/providers';
import { Web3Modal } from '@web3modal/ethers/react';
import { ReactNode } from 'react';

/* ------------------------------------------------------------------
   1.  Declare the Monad chain object – use the *same* chainId & RPC
       that you passed to Foundry (`MONAD_RPC`) and to ethr-did-resolver
   ------------------------------------------------------------------ */
const monad = {
  id: 1234,                                   // replace if Monad finalises id
  name: 'Monad Testnet',
  nativeCurrency: { name: 'MONAD', symbol: 'MONAD', decimals: 18 },
  rpcUrls: { default: { http: [process.env.NEXT_PUBLIC_MONAD_RPC!] } },
  blockExplorers: {
    default: { name: 'MonadScan', url: 'https://explorer.monad.xyz' },
  },
} as const;

/* ------------------------------------------------------------------
   2.  Configure wagmi  (connectors, provider, public client)
   ------------------------------------------------------------------ */
const { publicClient, chains } = configureChains(
  [monad],
  [
    jsonRpcProvider({
      rpc: () => ({ http: process.env.NEXT_PUBLIC_MONAD_RPC! }),
    }),
    publicProvider(),
  ],
);

const wagmiConfig = createConfig({
  connectors: [metaMask()],
  autoConnect: true,
  publicClient,
});

/* ------------------------------------------------------------------
   3.  Custom App component that wraps every page
   ------------------------------------------------------------------ */
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      {/* Optional:  <Web3Modal /> renders the connect button’s modals */}
      <Web3Modal />
      {/* All Next pages render below */}
      <Component {...pageProps} />
    </WagmiProvider>
  );
}
