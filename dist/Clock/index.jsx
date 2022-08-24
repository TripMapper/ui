import dynamic from 'next/dynamic';
const Clock = dynamic(() => import('./Clock'), {
    ssr: false,
    loading: () => <span>&nbsp;</span>,
});
export default Clock;
