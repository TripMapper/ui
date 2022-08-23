import css from './style.module.scss';
import TabItem, { TabItemProps } from './TabItem';
import { ReactNode, useMemo } from 'react';
import { cx } from '../util';

export interface TabItems {
	tabsLayoutId?: string;
	className?: string;
	items: ReadonlyArray<TabItemProps>;
	children?: ReactNode;
}

export default function Tabs ({ className, items, children, tabsLayoutId = 'tabsLayoutId' } : TabItems) {
	const hasIcons = useMemo(() => {
		for (const item of items)
			if (item.icon !== null)
				return true;

		return false;
	}, [items]);

	return (
		<ul className={cx(css.ul, className, hasIcons && css.hasIcons)}>
			{items.map(item => (
				<TabItem tabLayoutId={tabsLayoutId} key={item.uri ?? item.name} {...item} />
			))}

			{children && (
				<div className={css.kids}>{children}</div>
			)}
		</ul>
	);
}
