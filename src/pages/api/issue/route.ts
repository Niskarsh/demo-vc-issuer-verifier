import { NextRequest, NextResponse } from 'next/server';
import { ipfs } from '@/lib/ipfs';
import { signVC, digest } from '@/lib/vc';
import contracts from '@/contracts.json';
import { ethers } from 'ethers';
import { issuerWallet } from '@/lib/did';

const VC_ABI = ['function anchorVC(bytes32)'];

export async function POST(req: NextRequest) {
  const body = await req.json();          // {holder, skill, level, score, fileBase64?}

  // optional image
  let image, imageHash;
  if (body.fileBase64) {
    const buf   = Buffer.from(body.fileBase64, 'base64');
    imageHash   = ethers.keccak256(buf);
    const added = await ipfs.add(buf);
    image       = `ipfs://${added.cid.toString()}`;
  }

  const vcPayload = {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://example.com/schemas/proof-of-skill/v1"
    ],
    type: ["VerifiableCredential", "ProofOfSkillCredential"],
    issuer: issuerWallet.address,               // DID as address
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: body.holder,
      skillName: body.skill,
      level: body.level,
      score: body.score,
      image,
      imageHash,
      evaluationDate: new Date().toISOString()
    }
  };

  const jwt  = await signVC(vcPayload);
  const hash = digest(jwt);

  const vcReg  = new ethers.Contract(contracts.VC, VC_ABI, issuerWallet);
  const tx     = await vcReg.anchorVC(hash);
  await tx.wait();

  return NextResponse.json({ jwt, txHash: tx.hash });
}
