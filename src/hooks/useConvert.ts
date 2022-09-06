import { gql, useQuery } from 'urql';
import convert from '../util/convertCurrency';

export default function useConvert () {
	const [{ data }] = useQuery({
		query: gql`
			query GetCurrencies {
				currenciesList (filter: { conversionRate: { isNull: false } }) {
					id
					iso
					conversionRate
				}
			}
		`,
	});

	return (amount, from, to) => convert(amount, from, to, data?.currenciesList);
}
