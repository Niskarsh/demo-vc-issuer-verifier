import dynamic from 'next/dynamic';
export default dynamic(() => import('@/components/IssuerClient'), { ssr: false });
