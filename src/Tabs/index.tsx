import css from './style.module.scss';
import TabItem, { TabItemProps } from './TabItem';
import { ReactNode, useMemo } from 'react';
import { cx } from '../util';

export interface TabItems {
	tabsLayoutId?: string;
	className?: string;
	items: ReadonlyArray<TabItemProps>;
	children?: ReactNode;
	sidePadding?: boolean;
	/** @default false */
	compact?: boolean;
}

export default function Tabs ({
	className,
	items,
	children,
	tabsLayoutId = 'tabsLayoutId',
	sidePadding = false,
	compact = false,
} : TabItems) {
	if (compact && children)
		throw new Error('Compact tabs doesn\'t support children');

	const hasIcons = useMemo(() => {
		for (const item of items)
			if (item.icon !== void 0 && item.icon !== null)
				return true;

		return false;
	}, [items]);

	return (
		<ul className={cx(
			css.ul,
			className,
			hasIcons && css.hasIcons,
			sidePadding && css.sidePadding,
			compact && css.compact,
		)}>
			{items.map(item => (
				<TabItem compact={compact} tabLayoutId={tabsLayoutId} key={item.uri ?? item.name} {...item} />
			))}

			{(children && !compact) && (
				<div className={css.kids}>{children}</div>
			)}
		</ul>
	);
}
