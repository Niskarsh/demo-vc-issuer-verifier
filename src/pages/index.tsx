import Link from 'next/link';
import styles from '@/styles/Home.module.css';   // ← import our css

export default function Home() {
  return (
    <main className={styles.wrapper}>
      {/* -------- Intro ---------------------------------- */}
      <section>
        <h1 className={styles.h1}>Monad VC Demo</h1>
        <p>
          Issue and&nbsp;✅ verify W3C&nbsp;Verifiable Credentials on the
          <em> Monad</em> chain. Credentials are:
        </p>
        <ul>
          <li>signed as compact JWT&nbsp;(did:ethr)</li>
          <li>anchored on-chain for immutability</li>
          <li>verified with no central database</li>
        </ul>
      </section>

      {/* -------- Links ---------------------------------- */}
      <section>
        <h2 className={styles.h2}>Quick links</h2>
        <div className={styles.linkRow}>
          <Link className={styles.btn} href="/issuer">
            ➡ Issue Credential
          </Link>
          <Link className={styles.btn} href="/verify">
            ✅ Verify Credential
          </Link>
        </div>
      </section>

      {/* -------- Contracts ------------------------------ */}
      <section>
        <h2 className={styles.h2}>Smart-contract stack</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Contract</th>
              <th>Role</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>EthrDIDRegistry</td>
              <td>stores issuer &amp; holder public keys (ERC-1056)</td>
              <td className={styles.addr}>
                0x77d91F925BE17a0E0687CED678eD7024892bEd73
              </td>
            </tr>
            <tr>
              <td>SchemaRegistry</td>
              <td>anchors keccak256 hashes of schemas</td>
              <td className={styles.addr}>
                0x0FF02A02b5369b97495f8C09E7F3eeb20B72c5C2
              </td>
            </tr>
            <tr>
              <td>VCRegistry</td>
              <td>emits &amp; tracks hashes of issued / revoked VCs</td>
              <td className={styles.addr}>
                0x7568E17C73016845F036b51dAC21A31f38DDa0Fa
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* -------- How it works --------------------------- */}
      <section>
        <h2 className={styles.h2}>How it works</h2>
        <ol>
          <li>
            <strong>Issuer page</strong> signs the VC JWT, hashes it
            (keccak256) and calls <em>anchorVC()</em>.
          </li>
          <li>
            <strong>Holder</strong> stores the JWT (Snap, Google Wallet, etc.).
          </li>
          <li>
            <strong>Verifier page</strong> re-hashes the JWT, checks the on-chain
            hash &amp; signatures, then shows the result.
          </li>
        </ol>
      </section>
    </main>
  );
}
