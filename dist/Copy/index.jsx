import css from './style.module.scss';
import { cx } from '../util';
import React from 'react';
export default function Copy({ El = 'div', children, className, dark = false }) {
    return (<El className={cx(css.copy, className, dark && css.dark)}>
			{children}
		</El>);
}
