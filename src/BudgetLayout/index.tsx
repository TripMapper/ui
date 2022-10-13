import css from './style.module.scss';
import { formatCurrency, formatDate } from '../util';
import { CurrencyParts } from '../util/formatCurrency';
import Pill from '../Pill';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

export default function BudgetLayout ({
	total = 0,
	currency = 'USD',
	overBudget = false,
	headingChildren,
	transactionsHeadingChildren,
	totalDays,
	startDate,
	children,
}) {
	const { t } = useTranslation();
	const { symbol, integer, mantissa } = formatCurrency(total, currency, false, true) as CurrencyParts;

	const days = useMemo(() => {
		return Array.from({ length: totalDays }, (_, i) => {
			let date = null;

			if (startDate) {
				date = new Date(startDate);
				date.setDate(date.getDate() + i);
			}

			return {
				day: i + 1,
				date,
				total: +(Math.random() * 200).toFixed(2),
				cards: Array.from({ length: (Math.random() * 20)|0 }, (_, j) => ({
					id: (i + 1) * (j + 1),
					name: 'Lorem Ipsum',
				}))
			};
		});
	}, []);

	return (
		<div className={css.budgetLayout}>
			<div className={css.overview}>
				<header className={css.header}>
					<div>
						<h1>{symbol}{integer.toLocaleString(void 0)}<small>.{mantissa || '00'}</small></h1>
						{overBudget && <Pill large muted>{t('over_budget', 'Over Budget')}</Pill>}
					</div>
					{headingChildren}
				</header>
				{children}
			</div>
			<div className={css.transactions}>
				<header>
					<h3>{t('transactions', 'Transactions')}</h3>
					{transactionsHeadingChildren}
				</header>

				{days.map(({ day, date, total, cards }) => (
					<div key={day} className={css.day}>
						<header>
							<span>{date ? formatDate(date, null, { month: 'long', day: 'numeric' }) : `Day ${day}`}</span>
							<span>{formatCurrency(total, currency) as string}</span>
						</header>

						{cards.length === 0 ? (
							<div className={css.empty}>
								{t('no_spend_day', 'No spend on this day')}
							</div>
						) : (
							<ul>
								{cards.map(card => (
									<li key={card.id}>{card.name}</li>
								))}
							</ul>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
