import css from './style.module.scss';
import { cx } from '../util';
import { ReactNode } from 'react';

export interface InfoCardProps {
	highlight?: boolean;
	className?: string;
	children: ReactNode;
}

export default function InfoCard ({
	highlight = false,
	className,
	children,
} : InfoCardProps) {
	return (
		<div className={cx(css.infoCard, highlight && css.highlight, className)}>
			{children}
		</div>
	);
}
