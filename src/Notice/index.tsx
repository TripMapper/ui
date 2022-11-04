import css from './style.module.scss';
import { cx } from '../util';
import { ReactNode } from 'react';
import { Icons } from '../Types';
import Icon from '../Icon';

export interface NoticeProps {
	children: ReactNode;
	error?: boolean;
	success?: boolean;
	warning?: boolean;
	className?: string;
	icon?: Icons;
}

export default function Notice ({
	children,
	error = false,
	success = false,
	warning = false,
	icon = null,
	className,
} : NoticeProps) {
	return (
		<div className={cx(
			css.notice,
			className,
			error && css.error,
			success && css.success,
			warning && css.warning,
			icon && css.icon,
		)}>
			{icon ? (
				<>
					<Icon of={icon} m />
					<div>{children}</div>
				</>
			) : children}
		</div>
	);
}
