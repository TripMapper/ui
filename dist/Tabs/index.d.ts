import { TabItemProps } from './TabItem';
import { ReactNode } from 'react';
export interface TabItems {
    tabsLayoutId?: string;
    className?: string;
    items: ReadonlyArray<TabItemProps>;
    children?: ReactNode;
    sidePadding?: boolean;
    /** @default false */
    compact?: boolean;
}
export default function Tabs({ className, items, children, tabsLayoutId, sidePadding, compact, }: TabItems): JSX.Element;
