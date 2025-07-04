import dynamic from 'next/dynamic';
export default dynamic(() => import('@/components/VerifyClient'), { ssr: false });
