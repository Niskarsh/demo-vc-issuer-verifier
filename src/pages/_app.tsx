// pages/_app.tsx
import type { AppProps } from 'next/app'
import {
  WagmiProvider,                  // React context provider
  createConfig,
  http
} from 'wagmi'
import { injected } from 'wagmi/connectors'
import { createWeb3Modal } from '@web3modal/wagmi/react'   // v3 helper
// import '@/styles.css'

/* ---------- your custom Monad chain object ---------- */
export const monad = {
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'Monad Testnet', symbol: 'MON', decimals: 18 },
  rpcUrls: { default: { http: [process.env.NEXT_PUBLIC_MONAD_RPC as string] } },
} as const

/* ---------- wagmi v2 config ---------- */
export const wagmiConfig = createConfig({
  chains: [monad],
  connectors: [
    injected({            // MetaMask & other injected wallets
      target: 'metaMask'  // treat specifically as MetaMask
    })
  ],
  transports: {
    [monad.id]: http(process.env.NEXT_PUBLIC_MONAD_RPC!)
  }
})

/* ---------- Web3Modal (WalletConnect v2) ---------- */
createWeb3Modal({
  wagmiConfig,
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,   // get one free at cloud.walletconnect.com
  // chains: [monad]
})

export default function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      {/* <w3m-button /> web-component works anywhere now */}
      <Component {...pageProps} />
    </WagmiProvider>
  )
}
