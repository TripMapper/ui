import css from './style.module.scss';
import { ReactNode } from 'react';
import { cx } from '../util';

export interface HeaderProps {
	/** @default false */
	pullUp?: boolean;
	children?: ReactNode;
}

export default function Header ({ pullUp, children } : HeaderProps) {
	return (
		<header className={cx(
			css.header,
			pullUp && css.pullUp,
		)}>
			{children}
		</header>
	);
}
