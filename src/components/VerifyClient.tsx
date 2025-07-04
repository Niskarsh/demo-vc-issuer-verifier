'use client';
import { useAccount } from 'wagmi';
import { useState } from 'react';

export default function VerifyClient() {
  const { address } = useAccount();
  const [jwt, setJwt]     = useState('');
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  async function handleVerify() {
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jwt })
    });
    setResult(await res.json());
  }

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
      <h1 className="text-xl font-bold mb-4">Verify Credential</h1>

      <textarea
        className="border p-2 w-full h-40"
        placeholder="Paste VC JWT here"
        value={jwt}
        onChange={(e) => setJwt(e.target.value)}
      />
      <button
        className="bg-green-600 text-white px-4 py-2 mt-2 rounded"
        onClick={handleVerify}
      >
        Verify
      </button>

      {result && (
        <pre className="bg-gray-100 p-2 mt-4 overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
