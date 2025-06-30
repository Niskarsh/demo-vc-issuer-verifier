import { createVerifiableCredentialJwt, verifyCredential } from 'did-jwt-vc';
import { issuerDID, didResolver } from './did';
import { ethers } from 'ethers';

export const signVC = (payload: any) => 
  createVerifiableCredentialJwt(payload, 
    { issuer: issuerDID, subject: payload.credentialSubject.id });

export const verifyVC = (jwt: string) =>
  verifyCredential(jwt, didResolver);

export const digest = (jwt: string) =>
  ethers.keccak256(ethers.toUtf8Bytes(jwt));
