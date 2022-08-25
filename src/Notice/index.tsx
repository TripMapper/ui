import css from './style.module.scss';
import { cx } from '../util';
import { ReactNode } from 'react';

export interface NoticeProps {
	children: ReactNode;
	error?: boolean;
	success?: boolean;
	warning?: boolean;
	className?: string;
}

export default function Notice ({
	children,
	error = false,
	success = false,
	warning = false,
	className,
} : NoticeProps) {
	return (
		<div className={cx(
			css.notice,
			className,
			error && css.error,
			success && css.success,
			warning && css.warning,
		)}>
			{children}
		</div>
	);
}
