'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from '@/styles/Page.module.css';

const ConnectBtn = dynamic(() => import('@/components/ConnectBtn'), { ssr: false });

export default function IssuerClient() {
  const { address } = useAccount();
  const [form, setForm] = useState({ skill: '', level: 'Expert', score: 100 });
  const [jwt, setJwt]   = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setCopied(false);
    try {
      const res = await fetch('/api/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ holder: address, ...form })
      });
      const { jwt } = await res.json();
      setJwt(jwt);
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(jwt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <h1 className={styles.h1}>Issue Credential</h1>

      <label className={styles.label}>
        Skill
        <input
          className={styles.input}
          value={form.skill}
          onChange={(e) => setForm({ ...form, skill: e.target.value })}
        />
      </label>

      <label className={styles.label}>
        Level
        <select
          className={styles.input}
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
          <option>Expert</option>
        </select>
      </label>

      <label className={styles.label}>
        Score
        <input
          type="number"
          min={0}
          max={100}
          className={styles.input}
          value={form.score}
          onChange={(e) => setForm({ ...form, score: Number(e.target.value) })}
        />
      </label>

      <button
        className={styles.btnPrimary}
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? <span className={styles.spinner} /> : 'Generate VC ➡'}
      </button>

      {jwt && (
        <>
          <h2 className={styles.h2}>Issued VC (JWT)</h2>

          <div className={styles.copyRow}>
            <textarea
              readOnly
              rows={8}
              className={styles.textarea}
              value={jwt}
            />
            <button className={styles.btnSecondary} onClick={copyToClipboard}>
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
