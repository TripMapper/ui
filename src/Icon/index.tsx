import css from './style.module.scss';
import { useMemo, useState } from 'react';
import { cx } from '../util';
import { Icons } from '../Globals';

const URL_RX = /url\(["']?([a-z0-9._~()'!*:@,;+?\/-]*)['"]?\)/i;

export interface IconProps {
	of: Icons,

	xs?: boolean;
	s?: boolean;
	/**
	 * Automatically overridden by other style options
	 * @default true
	 **/
	m?: boolean;
	l?: boolean;
	xl?: boolean;
}

export default function Icon ({
	of,
	xs = false,
	s = false,
	m,
	l = false,
	xl = false,
} : IconProps) {
	const [self, setSelf] = useState(null);
	const svgPath = useMemo(() => {
		if (!self) return '';
		return new URL(window.getComputedStyle(self).backgroundImage.match(URL_RX)[1]).pathname;
	}, [self]);

	const className = cx(
		css.icon,
		xs && css.xs,
		s && css.s,
		m && css.m,
		l && css.l,
		xl && css.xl,
	);

	return (
		<svg ref={setSelf} viewBox="0 0 24 24" className={className}>
			<use xlinkHref={`${svgPath}#${of}`} />
		</svg>
	);
}
