import css from './style.module.scss';
import { cx } from '../util';
import React, { ReactNode } from 'react';

export interface CopyProps {
	El?: React.ElementType | string;
	className?: string;
	children: ReactNode;
	dark?: boolean;
}

export default function Copy ({ El = 'div', children, className, dark = false } : CopyProps) {
	return (
		<El className={cx(css.copy, className, dark && css.dark)}>
			{children}
		</El>
	);
}
