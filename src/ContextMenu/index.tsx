import dynamic from 'next/dynamic';
import ContextItemButton from './ContextItemButton';
import ContextMenuGroup from './ContextMenuGroup';
const ContextMenu = dynamic(() => import('./ContextMenu'), { ssr: false });

export { ContextItemButton, ContextMenuGroup };
export default ContextMenu;
