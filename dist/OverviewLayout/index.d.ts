import { ReactNode } from 'react';
import { Flags } from '../Types';
export interface OverviewLayoutProps {
    flagIso?: readonly Flags[];
    name?: string;
    content?: ReactNode;
    info?: ReactNode;
}
declare const overviewWide: string;
export { overviewWide };
export default function OverviewLayout({ flagIso, name, content, info, }: OverviewLayoutProps): JSX.Element;
