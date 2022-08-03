import css from './style.module.scss';
import { cx } from '../util';
import React from 'react';
export default function Copy({ El = 'div', children, className }) {
    return (<El className={cx(css.copy, className)}>
			{children}
		</El>);
}
