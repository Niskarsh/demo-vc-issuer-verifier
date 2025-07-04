import { EthrDID } from 'ethr-did';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';      // :contentReference[oaicite:3]{index=3}
import { ethers } from 'ethers';
import * as deployed from '../abis/deployed.json'; // :contentReference[oaicite:2]{index=2}

export const MONAD_RPC = process.env.NEXT_PUBLIC_MONAD_RPC!;
export const CHAIN_ID  = 10143;  // change to real id when Monad finalises

export const ethProvider = new ethers.JsonRpcProvider(MONAD_RPC);

/** Optional issuing key – *server only*.  Leave blank in browser. */
export const issuerWallet = process.env.ISSUER_PK
  ? new ethers.Wallet(process.env.ISSUER_PK, ethProvider)
  : undefined;

export const issuerDID = issuerWallet
  ? new EthrDID({
      identifier: issuerWallet.address,
      privateKey: issuerWallet.privateKey,
      chainNameOrId: CHAIN_ID,
      provider: ethProvider
    })
  : undefined;

export const didResolver = new Resolver(
  getResolver({
    networks: [{ name: 'Monad Testnet', chainId: CHAIN_ID, rpcUrl: MONAD_RPC, registry: deployed.ETHR }]
  })
);
