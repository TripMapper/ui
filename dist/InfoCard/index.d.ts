import { ReactNode } from 'react';
export interface InfoCardProps {
    highlight?: boolean;
    className?: string;
    children: ReactNode;
}
export default function InfoCard({ highlight, className, children, }: InfoCardProps): JSX.Element;
