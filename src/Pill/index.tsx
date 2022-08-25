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
} : PillProps) {
	return (
		<span className={cx(
			css.pill,
			className,
			muted && css.muted,

			travel && css.travel,
			activity && css.activity,
			accommodation && css.accommodation,
			food && css.food,
			other && css.other,
			plus && css.plus,
		)}>
			{children}
		</span>
	);
}
