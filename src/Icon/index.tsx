import css from './style.module.scss';
import { useMemo, useState } from 'react';
import { cx } from '../util';
import { Icons } from '../Types';

const URL_RX = /url\(["']?([a-z0-9._~()'!*:@,;+?\/-]*)['"]?\)/i;

export interface IconProps {
	of: Icons,
	className?: string;

	xs?: boolean;
	s?: boolean;
	/**
	 * Automatically overridden by other style options
	 * @default true
	 **/
	m?: boolean;
	l?: boolean;
	xl?: boolean;
	xxl?: boolean;
}

export default function Icon ({
	of,
	className,
	xs = false,
	s = false,
	m,
	l = false,
	xl = false,
	xxl = false,
} : IconProps) {
	const [self, setSelf] = useState(null);
	const svgPath = useMemo(() => {
		if (!self) return '';
		return new URL(window.getComputedStyle(self).backgroundImage.match(URL_RX)[1]).pathname;
	}, [self]);

	const cls = cx(
		css.icon,
		className,
		xs && css.xs,
		s && css.s,
		m && css.m,
		l && css.l,
		xl && css.xl,
		xxl && css.xxl,
	);

	return (
		<svg ref={setSelf} viewBox="0 0 24 24" className={cls}>
			<use xlinkHref={`${svgPath}#${of}`} />
		</svg>
	);
}
