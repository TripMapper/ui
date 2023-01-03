import css from './style.module.scss';
import { ReactNode } from 'react';
import { cx } from '../util';

export interface PillProps {
	children: ReactNode;
	className?: string;
	muted?: boolean;
	large?: boolean;

	travel?: boolean;
	activity?: boolean;
	accommodation?: boolean;
	food?: boolean;
	other?: boolean;
	plus?: boolean;
	black?: boolean;

	type?: 'travel' | 'activity' | 'accommodation' | 'food' | 'other';
}

export default function Pill ({
	children,
	className,
	muted,
	large = false,

	travel,
	activity,
	accommodation,
	food,
	other,
	plus,
	black,

	type,
} : PillProps) {
	return (
		<span className={cx(
			css.pill,
			className,
			muted && css.muted,
			large && css.large,

			(travel || type === 'travel') && css.travel,
			(activity || type === 'activity') && css.activity,
			(accommodation || type === 'accommodation') && css.accommodation,
			(food || type === 'food') && css.food,
			(other || type === 'other') && css.other,
			plus && css.plus,
			black && css.black,
		)}>
			{children}
		</span>
	);
}
