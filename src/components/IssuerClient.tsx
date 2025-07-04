'use client';
import { useAccount } from 'wagmi';
import { useState } from 'react';

export default function IssuerClient() {
  const { address } = useAccount();
  const [form, setForm] = useState({ skill: '', level: 'Expert', score: 100 });
  const [jwt, setJwt]   = useState('');

  async function handleGenerate() {
    const res = await fetch('/api/issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ holder: address, ...form })
    });
    const { jwt } = await res.json();
    setJwt(jwt);
  }

  /* ─── UI ─── */
  if (!address) {
    return (
      <main className="p-10 flex justify-center">
        {/* @ts-expect-error: Property 'w3m-button' does not exist on type 'JSX.IntrinsicElements'. */}
        <w3m-button />
      </main>
    );
  }

  return (
    <main className="p-10 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Issue Credential</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Skill"
        value={form.skill}
        onChange={(e) => setForm({ ...form, skill: e.target.value })}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleGenerate}
      >
        Generate VC
      </button>

      {jwt && (
        <>
          <h2 className="mt-6 font-bold">Your VC (JWT)</h2>
          <textarea
            readOnly
            rows={8}
            value={jwt}
            className="w-full border p-2"
          />
        </>
      )}
    </main>
  );
}
