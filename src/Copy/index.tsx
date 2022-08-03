import css from './style.module.scss';
import { cx } from '../util';
import React, { ReactNode } from 'react';

export interface CopyProps {
	El?: React.ElementType | string;
	className?: string;
	children: ReactNode;
}

export default function Copy ({ El = 'div', children, className } : CopyProps) {
	return (
		<El className={cx(css.copy, className)}>
			{children}
		</El>
	);
}
