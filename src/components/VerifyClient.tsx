'use client';

import { useState } from 'react';
import styles from '@/styles/Page.module.css';

export default function VerifyClient() {
  const [jwt, setJwt]       = useState('');
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleVerify() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/verify', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({ jwt })
      });
      setResult(await res.json());
    } finally {
      setLoading(false);
    }
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
        disabled={loading || !jwt.trim()}
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
