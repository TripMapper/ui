import { TabItemProps } from './TabItem';
import { ReactNode } from 'react';
export interface TabItems {
    tabsLayoutId?: string;
    className?: string;
    items: ReadonlyArray<TabItemProps>;
    children?: ReactNode;
    sidePadding?: boolean;
}
export default function Tabs({ className, items, children, tabsLayoutId, sidePadding, }: TabItems): JSX.Element;
