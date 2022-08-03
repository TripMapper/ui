import { ReactElement, ReactFragment } from 'react';
export interface ContextMenuProps {
    children: ReactElement;
    menu: ReactFragment;
}
export default function ContextMenu({ children, menu }: ContextMenuProps): JSX.Element;
