import css from './style.module.scss';
import { cx, formatCurrency } from '../util';
import { Children, cloneElement, useMemo } from 'react';
export function BudgetBarLabel({ label, value, currency, grow = false, muted = false, danger = false, }) {
    const val = useMemo(() => {
        if (typeof value === 'number') {
            const { symbol, integer, mantissa } = formatCurrency(value, currency, false, true);
            return (<strong>{symbol}{integer.toLocaleString(void 0)}<small>.{mantissa || '00'}</small></strong>);
        }
        return <strong>{value}</strong>;
    }, [value]);
    return (<div className={cx(css.label, grow && css.grow, muted && css.muted, danger && css.danger)}>
			<span>{label}</span>
			{val}
		</div>);
}
export default function BudgetBar({ fill, tall = false, danger = false, theme = 'mono', children, currency = 'USD', }) {
    if (theme !== 'mono' && typeof fill !== 'number')
        throw new Error('Multiple fills are only supported by the mono theme');
    if (typeof fill === 'number')
        fill = [{ value: fill, opacity: 1 }];
    return (<div className={cx(css.budgetBar, css[theme], tall && css.tall)}>
			<div className={cx(css.bar, danger && css.danger)}>
				<div className={css.mask}>
					{fill.map(({ value, opacity }, i) => (<span key={i} style={{
                width: `${value}%`,
                opacity,
                animationDelay: `${0.5 * i}s`,
            }}/>))}
				</div>
			</div>
			{children && (<div className={css.labels}>
					{Children.map(children, child => cloneElement(child, { currency }))}
				</div>)}
		</div>);
}
