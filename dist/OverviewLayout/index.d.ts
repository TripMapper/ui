import { ReactNode } from 'react';
export interface OverviewLayoutProps {
    flagIso?: readonly string[];
    name?: string;
    content?: ReactNode;
    info?: ReactNode;
}
declare const overviewWide: string;
export { overviewWide };
export default function OverviewLayout({ flagIso, name, content, info, }: OverviewLayoutProps): JSX.Element;
