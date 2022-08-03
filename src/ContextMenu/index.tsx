import dynamic from 'next/dynamic';
import ContextItemButton from './ContextItemButton';
const ContextMenu = dynamic(() => import('./ContextMenu'), { ssr: false });

export { ContextItemButton };
export default ContextMenu;
