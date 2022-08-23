import { MouseEventHandler, ReactNode } from 'react';
export interface HeaderActionProps {
    text: string;
    href?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
export interface HeaderProps {
    /** @default false */
    pullUp?: boolean;
    logo?: ReactNode;
    menu?: ReactNode;
    contextMenu?: ReactNode;
    logoAction?: HeaderActionProps;
    contextAction?: HeaderActionProps;
}
export default function Header({ pullUp, logo, menu, contextMenu, logoAction, contextAction, }: HeaderProps): JSX.Element;
