import React, { ReactNode } from 'react';
export interface CopyProps {
    El?: React.ElementType | string;
    className?: string;
    children: ReactNode;
    dark?: boolean;
}
export default function Copy({ El, children, className, dark }: CopyProps): JSX.Element;
