import css from './style.module.scss';
import { cx } from '../util';
import { ReactNode } from 'react';

export interface InfoCardProps {
	highlight?: boolean;
	children: ReactNode;
}

export default function InfoCard ({
	highlight = false,
	children,
} : InfoCardProps) {
	return (
		<div className={cx(css.infoCard, highlight && css.highlight)}>
			{children}
		</div>
	);
}
