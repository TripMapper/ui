import { ReactNode } from 'react';
export interface NoticeProps {
    children: ReactNode;
    error?: boolean;
    success?: boolean;
    warning?: boolean;
    className?: string;
}
export default function Notice({ children, error, success, warning, className, }: NoticeProps): JSX.Element;
