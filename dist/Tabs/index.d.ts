import { TabItemProps } from './TabItem';
import { ReactNode } from 'react';
export interface TabItems {
    tabsLayoutId?: string;
    className?: string;
    items: ReadonlyArray<TabItemProps>;
    children?: ReactNode;
}
export default function Tabs({ className, items, children, tabsLayoutId }: TabItems): JSX.Element;
