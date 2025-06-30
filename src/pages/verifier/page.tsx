'use client';
import { useAccount } from 'wagmi';
import { Web3Modal } from '@web3modal/ethers/react';
import { useState } from 'react';

export default function VerifyPage() {
  const { address } = useAccount();
  const [jwt, setJwt] = useState('');
  const [result, setResult] = useState<any>();

  async function handleVerify() {
    const res = await fetch('/api/verify', {method:'POST', body:JSON.stringify({jwt})});
    setResult(await res.json());
  }

  return (
    <main className="p-10 max-w-xl mx-auto">
      <Web3Modal />
      {!address && <p>Connect wallet to verify.</p>}
      {address && (
        <>
          <h2 className="text-xl font-bold mb-4">Paste VC / VP</h2>
          <textarea className="border p-2 w-full h-40" value={jwt} onChange={e=>setJwt(e.target.value)}/>
          <button className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
                  onClick={handleVerify}>Verify</button>
          {result && <pre className="bg-gray-100 p-2 mt-4">{JSON.stringify(result,null,2)}</pre>}
        </>
      )}
    </main>
  );
}
