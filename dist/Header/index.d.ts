import { ReactNode } from 'react';
export interface HeaderProps {
    /** @default false */
    pullUp?: boolean;
    children?: ReactNode;
}
export default function Header({ pullUp, children }: HeaderProps): JSX.Element;
