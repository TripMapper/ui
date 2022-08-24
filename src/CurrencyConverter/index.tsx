import css from './style.module.scss';
import { gql, useQuery } from 'urql';
import { useMemo, useState } from 'react';
import getCurrencySymbol from '../util/getCurrencySymbol';
import Notice from '../Notice';
import Select from '../Select';
import { SelectOption } from '../Select/Select';
import { formatCurrency } from '../util';
import convert from '../util/convertCurrency';
import parseNumberLocale from '../util/parseNumberLocale';

const appendSym = currencyIso => {
	const iso = currencyIso.toUpperCase()
		, sym = getCurrencySymbol(currencyIso);

	return iso === sym ? iso : `${iso} ${sym}`;
};

export default function CurrencyConverter ({ defaultFrom = 'EUR', to }) {
	const [value, setValue] = useState(1);
	const [from, setFrom] = useState({
		label: appendSym(defaultFrom),
		value: defaultFrom,
	} as SelectOption);

	const [{ data, error }] = useQuery({
		query: gql`
			query GetCurrencies {
				currenciesList (filter: { conversionRate: { isNull: false } }) {
					id
					name
					iso
					conversionRate
				}
			}
		`,
	});

	const opts = useMemo(() => {
		return data?.currenciesList?.map(currency => ({
			label: appendSym(currency.iso),
			value: currency.iso,
			disabled: currency.iso.toLowerCase() === to.toLowerCase(),
		})) ?? [];
	}, [data]);

	const onInput = e => setValue(parseNumberLocale(e.target.value));

	return (
		<figure>
			{error && <Notice error>{error.message}</Notice>}

			<div className={css.from}>
				<Select
					name=""
					options={opts}
					defaultValue={from}
					onChange={v => setFrom(v as SelectOption)}
					inline
				/>
				<label>
					<span>{getCurrencySymbol(from.value as string)}</span>
					<input
						type="text" inputMode="numeric" pattern="[0-9.,]*"
						defaultValue={1}
						onInput={onInput}
					/>
				</label>
			</div>

			<div className={css.to}>
				<span>{to.toUpperCase()}</span>
				<strong>{(formatCurrency(convert((isNaN(value) ? 0 : value), from.value.toString(), to, data?.currenciesList ?? []) ?? 1, to) as string).replace(/\.0+$/, '')}</strong>
			</div>

			<figcaption className={css.caption}>
				Exchange rate used is the wholesale rate from the European
				central bank. Your bank's exchange rate may vary. Please check
				with your bank if you are unsure.
			</figcaption>
		</figure>
	);
}
