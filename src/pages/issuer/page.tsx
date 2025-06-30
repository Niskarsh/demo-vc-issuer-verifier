'use client';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Web3Modal } from '@web3modal/ethers/react';
import { useState } from 'react';

export default function IssuerPage() {
  const { address } = useAccount();
  const [form, setForm] = useState({ skill: '', level: 'Expert', score: 100 });
  const [jwt,  setJwt]  = useState<string>();

  async function handleSubmit() {
    const res = await fetch('/api/issue', {
      method: 'POST',
      body: JSON.stringify({ holder: address, ...form })
    });
    const { jwt } = await res.json();
    setJwt(jwt);

    /* ---------- OPTIONAL WALLET IMPORT (MetaMask Snap) ---------
       window.ethereum.request({
         method: 'wallet_invokeSnap',
         params: {
            snapId: 'npm:vc-snap',                  // any VC storing snap
            request: { method: 'vc_add', params:{ jwt } }
         }
       });
    ------------------------------------------------------------*/
  }

  return (
    <main className="p-10 max-w-xl mx-auto">
      <Web3Modal />
      {!address && <p>Please connect your wallet.</p>}
      {address && (
        <>
          <h2 className="text-xl font-bold mb-4">Generate Credential</h2>
          <input className="border p-2 w-full mb-2" placeholder="Skill"
                 onChange={e=>setForm({...form, skill: e.target.value})}/>
          <button className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleSubmit}>Generate VC</button>
          {jwt && <textarea readOnly className="w-full mt-4 h-40 p-2 border" value={jwt}/>}
        </>
      )}
    </main>
  );
}
