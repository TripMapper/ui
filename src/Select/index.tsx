import dynamic from 'next/dynamic';
const Select = dynamic(() => import('./Select'), { ssr: false });

export default Select;
