import type { NextApiRequest, NextApiResponse } from 'next'
import { issuerWallet } from '@/lib/did'
import { signVC, digest } from '@/lib/vc'
import { VC_REG_ADDR, VC_ABI_TYPED } from '@/lib/contracts'
import { ethers } from 'ethers'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end()

  const { holder, skill, level, score } = req.body
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!issue', { holder, skill, level, score })
  const now = Math.floor(Date.now() / 1000);          // seconds
  const payload = {
    /** required by JwtCredentialPayload */
    sub: holder,          // subject DID
    nbf: now,             // not-before
    vc: {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://example.com/schemas/proof-of-skill/v1'
      ],
      type: ['VerifiableCredential', 'ProofOfSkillCredential'],
      credentialSubject: {
        id: holder,
        skillName: skill,
        level,
        score,
        evaluationDate: new Date().toISOString()
      }
    }
  } satisfies import('did-jwt-vc').JwtCredentialPayload;
  

  const jwt  = await signVC(payload)
  console.log('$$$$$$$$$$$$$$$$$$$$$$$', jwt)
  const hash = digest(jwt)

  /* — anchor on-chain with the real signer (ethers Wallet) — */
  const vcReg = new ethers.Contract(
    VC_REG_ADDR,
    VC_ABI_TYPED,
    issuerWallet                  // <-- wallet is a Signer (ContractRunner) :contentReference[oaicite:1]{index=1}
  )
  const tx = await vcReg.anchorVC(hash)
  await tx.wait()

  res.status(200).json({ jwt, txHash: tx.hash })
}
