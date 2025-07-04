import type { JwtCredentialPayload, Issuer } from 'did-jwt-vc'
import {
  createVerifiableCredentialJwt,
  verifyCredential
} from 'did-jwt-vc'                 //  docs: createVerifiableCredentialJwt(payload, issuer) :contentReference[oaicite:0]{index=0}
import { issuerDID, didResolver }   from './did'
import { keccak256, toUtf8Bytes } from 'ethers';


export async function signVC (
  payload: JwtCredentialPayload
): Promise<string> {
  if (!issuerDID) throw new Error('Issuer wallet not configured on server')
  // EthrDID already implements the Issuer interface → cast for TS
  return createVerifiableCredentialJwt(payload, issuerDID as unknown as Issuer)
}

export function verifyVC (jwt: string) {
  return verifyCredential(jwt, didResolver)
}

export const digest = (jwt: string) => keccak256(toUtf8Bytes(jwt));
