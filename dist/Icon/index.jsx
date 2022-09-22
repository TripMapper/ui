import css from './style.module.scss';
import { useMemo, useState } from 'react';
import { cx } from '../util';
const URL_RX = /url\(["']?([a-z0-9._~()'!*:@,;+?\/-]*)['"]?\)/i;
export default function Icon({ of, className, xs = false, s = false, m, l = false, xl = false, xxl = false, }) {
    const [self, setSelf] = useState(null);
    const svgPath = useMemo(() => {
        if (!self)
            return '';
        return new URL(window.getComputedStyle(self).backgroundImage.match(URL_RX)[1]).pathname;
    }, [self]);
    const cls = cx(css.icon, className, xs && css.xs, s && css.s, m && css.m, l && css.l, xl && css.xl, xxl && css.xxl);
    return (<svg ref={setSelf} viewBox="0 0 24 24" className={cls}>
			<use xlinkHref={`${svgPath}#${of}`}/>
		</svg>);
}
