import { NextRequest, NextResponse } from 'next/server';
import { verifyVC, digest } from '@/lib/vc';
import contracts from '@/contracts.json';
import { ethers } from 'ethers';

const VC_ABI = ['function revoked(bytes32) view returns (bool)'];

export async function POST(req: NextRequest) {
  const { jwt } = await req.json();
  try {
    const verified = await verifyVC(jwt);            // digital sig + DID resolver
    const vcHash   = digest(jwt);

    const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_MONAD_RPC);
    const vcReg    = new ethers.Contract(contracts.VC, VC_ABI, provider);
    const revoked  = await vcReg.revoked(vcHash);

    return NextResponse.json({ valid: true, revoked, payload: verified });
  } catch (e:any) {
    return NextResponse.json({ valid: false, error: e.message }, { status: 400 });
  }
}
