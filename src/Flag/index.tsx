import css from './style.module.scss';
import { cx } from '../util';
import { useMemo, useState } from 'react';
import { Flags } from '../Types';

const URL_RX = /url\(["']?([a-z0-9._~()'!*:@,;+?\/-]*)['"]?\)/i;
const countryNames = new Intl.DisplayNames(void 0, { type: 'region' });

export interface FlagProps {
	iso: Flags;
	small?: boolean;
	medium?: boolean;
	large?: boolean;
}

export default function Flag ({
	iso,
	small = false,
	medium = false,
	large = false,
} : FlagProps) {
	const [self, setSelf] = useState(null);
	const svgPath = useMemo(() => {
		if (!self) return '';
		return new URL(window.getComputedStyle(self).backgroundImage.match(URL_RX)[1]).pathname;
	}, [self]);

	iso = iso.toUpperCase() as Flags;

	const className = cx(
		css.flag,
		small && css.s,
		medium && css.m,
		large && css.l,
		(iso === 'NP') && css.uniqueShape,
	);

	return (
		<svg ref={setSelf} viewBox="0 0 32 24" className={className}>
			<title>{countryNames.of(iso)}</title>
			<use xlinkHref={`${svgPath}#${iso}`}/>
		</svg>
	);
}
