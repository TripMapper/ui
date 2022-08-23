import { Icons } from '../Types';
import { ReactNode } from 'react';
export interface InfoBlockProps {
    icon: Icons;
    primary: string;
    secondary?: string;
    count?: string;
    label: string;
    children?: ReactNode;
}
export default function InfoBlock({ icon, primary, secondary, count, label, children, }: InfoBlockProps): JSX.Element;
