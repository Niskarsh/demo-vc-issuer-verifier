import dynamic from 'next/dynamic';

export default dynamic(
  () => import('@/components/IssuerClient'),
  { ssr: false }            // 🛑 no server render ⇒ no hydration mismatch
);
