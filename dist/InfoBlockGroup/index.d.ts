import { ReactNode } from 'react';
export interface InfoBlockGroupProps {
    heading: ReactNode;
    children: ReactNode;
}
export default function InfoBlockGroup({ heading, children, }: InfoBlockGroupProps): JSX.Element;
