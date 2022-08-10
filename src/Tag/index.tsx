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

export interface TagGroupProps {
	tags: readonly { id: any, name: string, look?: 'accommodation' | 'activity' | 'food' | 'travel' | 'other' }[],
	limit: number,
	small?: boolean;
}

export function TagGroup ({
	tags = [],
	limit = 2,
	small = false,
} : TagGroupProps) {
	return (
		<div className={css.tagGroup}>
			{tags.slice(0, limit).map(tag => (
				<Tag key={tag.id} small={small} look={tag.look}>
					{tag.name}
				</Tag>
			))}
			{limit < tags.length && (
				<Tag small={small}>+{tags.length - limit}</Tag>
			)}
		</div>
	);
}
