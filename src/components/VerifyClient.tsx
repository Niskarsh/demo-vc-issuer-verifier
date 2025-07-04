'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from '@/styles/Page.module.css';

const ConnectBtn = dynamic(() => import('@/components/ConnectBtn'), { ssr: false });

export default function VerifyClient() {
  const { address } = useAccount();
  const [jwt, setJwt]       = useState('');
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jwt })
      });
      setResult(await res.json());
    } finally {
      setLoading(false);
    }
  }

  if (!address) {
    return (
      <main className={styles.wrapper}>
        <ConnectBtn />
      </main>
    );
  }

  return (
    <main className={styles.wrapper}>
      <h1 className={styles.h1}>Verify Credential</h1>

      <textarea
        className={styles.textarea}
        placeholder="Paste VC JWT here"
        value={jwt}
        onChange={(e) => setJwt(e.target.value)}
      />

      <button
        className={styles.btnPrimary}
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? <span className={styles.spinner} /> : 'Verify ✅'}
      </button>

      {result && (
        <>
          <h2 className={styles.h2}>Result</h2>
          <pre className={styles.pre}>{JSON.stringify(result, null, 2)}</pre>
        </>
      )}
    </main>
  );
}
