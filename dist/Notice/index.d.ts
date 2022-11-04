import { ReactNode } from 'react';
import { Icons } from '../Types';
export interface NoticeProps {
    children: ReactNode;
    error?: boolean;
    success?: boolean;
    warning?: boolean;
    className?: string;
    icon?: Icons;
}
export default function Notice({ children, error, success, warning, icon, className, }: NoticeProps): JSX.Element;
