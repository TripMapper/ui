import { ReactElement, ReactFragment, ReactNode } from 'react';
export interface ContextMenuProps {
    children: ReactElement;
    menu: ReactFragment | ReactElement | ReactNode;
}
export default function ContextMenu({ children, menu }: ContextMenuProps): JSX.Element;
