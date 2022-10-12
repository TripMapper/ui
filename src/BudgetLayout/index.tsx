import css from './style.module.scss';
import { formatCurrency } from '../util';
import { CurrencyParts } from '../util/formatCurrency';
import Pill from '../Pill';
import { useTranslation } from 'react-i18next';

export default function BudgetLayout ({
	total = 0,
	currency = 'USD',
	transactionsHeading,
	transactionsHeadingChildren,
}) {
	const { t } = useTranslation();
	const { symbol, integer, mantissa } = formatCurrency(total, currency, false, true) as CurrencyParts;

	return (
		<div className={css.budgetLayout}>
			<div>
				<header className={css.header}>
					<div>
						<h1>{symbol}{integer.toLocaleString(void 0)}<small>.{mantissa || '00'}</small></h1>
						<Pill large muted>{t('over_budget', 'Over Budget')}</Pill>
					</div>
				</header>
			</div>
			<div className={css.transactions}>
				<header>
					<h3>{transactionsHeading}</h3>
					{transactionsHeadingChildren}
				</header>
			</div>
		</div>
	);
}
