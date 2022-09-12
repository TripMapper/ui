import { ReactElement, ReactFragment, ReactNode } from 'react';
export interface ContextMenuProps {
    children: ReactElement;
    menu: ReactFragment | ReactElement | ReactNode;
    isOpen?: (boolean: any) => void;
}
export default function ContextMenu({ children, menu, isOpen }: ContextMenuProps): JSX.Element;
