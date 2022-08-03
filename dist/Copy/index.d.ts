import React, { ReactNode } from 'react';
export interface CopyProps {
    El?: React.ElementType | string;
    className?: string;
    children: ReactNode;
}
export default function Copy({ El, children, className }: CopyProps): JSX.Element;
