import css from './style.module.scss';
import TabItem, { TabItemProps } from './TabItem';
import { ReactNode } from 'react';
import { cx } from '../util';

export interface TabItems {
	tabsLayoutId?: string;
	className?: string;
	items: ReadonlyArray<TabItemProps>;
	children?: ReactNode;
}

export default function Tabs ({ className, items, children, tabsLayoutId = 'tabsLayoutId' } : TabItems) {
	return (
		<ul className={cx(css.ul, className)}>
			{items.map(item => (
				<TabItem tabLayoutId={tabsLayoutId} key={item.uri ?? item.name} {...item} />
			))}

			{children && (
				<div className={css.kids}>{children}</div>
			)}
		</ul>
	);
}
