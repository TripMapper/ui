import { ReactNode } from 'react';
export interface InfoCardProps {
    highlight?: boolean;
    children: ReactNode;
}
export default function InfoCard({ highlight, children, }: InfoCardProps): JSX.Element;
