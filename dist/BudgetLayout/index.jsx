import css from './style.module.scss';
import { cx, formatCurrency, formatDate } from '../util';
import Pill from '../Pill';
import { useTranslation } from 'react-i18next';
import TransactionItem from '../TransactionItem';
export default function BudgetLayout({ total = 0, currency = 'USD', overBudget = false, headingChildren, transactionsHeadingChildren, days, children, isDaily, maxDaily, filterKey, }) {
    const { t } = useTranslation();
    const { symbol, integer, mantissa } = formatCurrency(total, currency, false, true);
    return (<div className={css.budgetLayout}>
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

				{days.map(({ day, date, total, cards }) => (<div key={day} className={css.day}>
						<header>
							<span>{date ? formatDate(date, null, { month: 'long', day: 'numeric' }) : `Day ${day + 1}`}</span>
							<span className={cx(isDaily && total > maxDaily && css.over)}>{formatCurrency(total, currency)}</span>
						</header>

						{cards.length === 0 ? (<div className={css.empty}>
								{t('no_spend_day', 'No spend on this day')}
							</div>) : (<ul>
								{cards.map(card => (<TransactionItem El="li" key={`${card.id}_${filterKey}`} {...card}/>))}
							</ul>)}
					</div>))}
			</div>
		</div>);
}
