import { ReactNode } from 'react';
export interface PageProps {
    heading: string;
    children: ReactNode;
}
export default function Page({ heading, children }: PageProps): JSX.Element;
