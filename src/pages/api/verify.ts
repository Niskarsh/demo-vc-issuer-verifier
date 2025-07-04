import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyVC, digest } from '@/lib/vc';
import { VC_REG_ADDR, VC_ABI_TYPED } from '@/lib/contracts';
import { ethers } from 'ethers';
import { MONAD_RPC } from '@/lib/did';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end();
  const { jwt } = req.body;

  try {
    const verified = await verifyVC(jwt);
    console.log(`#######################`, verified);
    const vcHash = digest(jwt);
    const provider = new ethers.JsonRpcProvider(MONAD_RPC);
    const vcReg = new ethers.Contract(VC_REG_ADDR, VC_ABI_TYPED, provider);
    const revoked = await vcReg.revoked(vcHash);
    res.status(200).json({ valid: true, revoked, payload: verified });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    res.status(400).json({ valid: false, error: errorMessage });
  }
}
