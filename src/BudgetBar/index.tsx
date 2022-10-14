import css from './style.module.scss';
import { cx, formatCurrency } from '../util';
import { CurrencyParts } from '../util/formatCurrency';
import { Children, cloneElement, MouseEventHandler, useMemo } from 'react';

export type BudgetBarFill = {
	value: number;
	opacity: number;
}

export interface BudgetBarProps {
	fill: number | readonly BudgetBarFill[];
	/** @default false */
	tall?: boolean;
	/** @default false */
	danger?: boolean;
	/** @default 'mono' */
	theme?: 'mono' | 'accommodation' | 'activity' | 'food' | 'travel' | 'other';
	children?: any;
	/** @default 'USD' */
	currency?: string;
}

export interface BudgetBarLabelProps {
	label: string;
	value: string | number;
	/** @default false */
	grow?: boolean;
	/** @default false */
	muted?: boolean;
	/** @default false */
	danger?: boolean;
	/**
	 * Do not set, will be replaced by BudgetBarProps.currency
	 * @internal
	 * */
	currency?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	isActive?: boolean;
}

export function BudgetBarLabel ({
	label, value, currency,
	grow = false,
	muted = false,
	danger = false,
	onClick = void 0,
	isActive = false,
} : BudgetBarLabelProps) {
	const val = useMemo(() => {
		if (typeof value === 'number') {
			const { symbol, integer, mantissa } = formatCurrency(value, currency, false, true) as CurrencyParts;
			return (
				<strong>{symbol}{integer.toLocaleString(void 0)}<small>.{mantissa || '00'}</small></strong>
			);
		}

		return <strong>{value}</strong>;
	}, [value]);

	const El = onClick ? 'button' : 'div';

	return (
		<El
			className={cx(
				css.label,
				grow && css.grow,
				(muted && !isActive) && css.muted,
				danger && css.danger,
				isActive && css.active,
			)}
			onClick={onClick as any}
			type={onClick ? 'button' : void 0}
		>
			<span>{label}</span>
			{val}
		</El>
	);
}

export default function BudgetBar ({
	fill,
	tall = false,
	danger = false,
	theme = 'mono',
	children,
	currency = 'USD',
} : BudgetBarProps) {
	if (theme !== 'mono' && typeof fill !== 'number')
		throw new Error('Multiple fills are only supported by the mono theme');

	if (typeof fill === 'number')
		fill = [{ value: fill, opacity: 1 }]

	return (
		<div className={cx(css.budgetBar, css[theme], tall && css.tall)}>
			<div className={cx(
				css.bar,
				danger && css.danger,
			)}>
				<div className={css.mask}>
					{fill.map(({ value, opacity }, i) => (
						<span
							key={i}
							style={{
								width: `${value}%`,
								opacity,
								animationDelay: `${0.5 * i}s`,
							}}
						/>
					))}
				</div>
			</div>
			{children && (
				<div className={css.labels}>
					{Children.map(children, child => child ? cloneElement(
						child,
						{ currency }
					) : null)}
				</div>
			)}
		</div>
	);
}
