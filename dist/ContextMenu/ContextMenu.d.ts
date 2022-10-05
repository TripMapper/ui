import { ReactElement, ReactFragment, ReactNode } from 'react';
export interface ContextMenuProps {
    children: ReactElement;
    menu: ReactFragment | ReactElement | ReactNode;
    isOpen?: (boolean: any) => void;
    asDiv?: boolean;
}
export default function ContextMenu({ children, menu, isOpen, asDiv }: ContextMenuProps): JSX.Element;
