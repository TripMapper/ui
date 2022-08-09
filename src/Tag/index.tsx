import css from './style.module.scss';
import { ReactNode } from 'react';
import { cx } from '../util';

export interface TagProps {
	children: ReactNode;
	/** @default true */
	margin?: boolean;
	/** @default null */
	look?: 'accommodation' | 'activity' | 'food' | 'travel' | 'other';
	/** @default false */
	small?: boolean;
}

export default function Tag ({
	children,
	margin = true,
	look = null,
	small = false,
} : TagProps) {
	return (
		<div className={cx(
			css.tag,
			margin && css.margin,
			look && css[look],
			small && css.small,
		)}>
			{children}
		</div>
	);
}
