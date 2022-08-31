import css from './style.module.scss';
import { ReactNode } from 'react';
import { cx } from '../util';

export interface PillProps {
	children: ReactNode;
	className?: string;
	muted?: boolean;

	travel?: boolean;
	activity?: boolean;
	accommodation?: boolean;
	food?: boolean;
	other?: boolean;
	plus?: boolean;

	type?: 'travel' | 'activity' | 'accommodation' | 'food' | 'other';
}

export default function Pill ({
	children,
	className,
	muted,

	travel,
	activity,
	accommodation,
	food,
	other,
	plus,

	type,
} : PillProps) {
	return (
		<span className={cx(
			css.pill,
			className,
			muted && css.muted,

			(travel || type === 'travel') && css.travel,
			(activity || type === 'activity') && css.activity,
			(accommodation || type === 'accommodation') && css.accommodation,
			(food || type === 'food') && css.food,
			(other || type === 'other') && css.other,
			plus && css.plus,
		)}>
			{children}
		</span>
	);
}