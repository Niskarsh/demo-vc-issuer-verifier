import { createPublicClient, http } from 'viem';
import { ethers } from 'ethers';
import { EthrDID } from 'ethr-did';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import contracts from '@/contracts.json';

export const MONAD_RPC = process.env.NEXT_PUBLIC_MONAD_RPC!;
export const CHAIN_ID  = 1234;              // update if Monad assigns final id

export const ethProvider = new ethers.JsonRpcProvider(MONAD_RPC);

export const issuerWallet = new ethers.Wallet(
  process.env.ISSUER_PK!, ethProvider
);

export const issuerDID = new EthrDID({
  identifier: issuerWallet.address,
  privateKey: issuerWallet.privateKey,
  provider   : ethProvider,
  chainNameOrId: CHAIN_ID
});

export const didResolver = new Resolver(getResolver({
  networks: [{ name: 'monad', rpcUrl: MONAD_RPC, chainId: CHAIN_ID }]
}));
