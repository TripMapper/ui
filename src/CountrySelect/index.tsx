import css from './style.module.scss';
import Select from '../Select';
import { gql, useQuery } from 'urql';
import { SelectOption, SelectProps } from '../Select/Select';
import { useMemo } from 'react';
import Flag from '../Flag';
import fuzzy from '../util/fuzzy';

const { compare } = new Intl.Collator();

const COUNTRY_SELECT_QUERY = gql`
    query GetCountries {
        countries (filter: { isArchived: { equalTo: false } }) {
            nodes {
                id
                name
                iso
            }
        }
    }
`;

export interface CountrySelectProps extends Omit<
	SelectProps,
	'query'|'queryWhenEmpty'|'preloadOptions'|'queryVariables'|'pathToNodes'
	|'options'|'filterOption' | 'isCreatable'
> {
	defaultValueIso?: string;
}

export default function CountrySelect ({ name, defaultValue, defaultValueIso, ...props } : CountrySelectProps) {
	const [{ data, fetching }] = useQuery({
		query: COUNTRY_SELECT_QUERY,
	});

	const { opts, defaultVal } = useMemo(() => {
		if (!data || !data.countries) return { opts: [], defaultVal: null };

		let defaultByIso = null;

		const c = data.countries.nodes.reduce((a, o) => {
			if (defaultValueIso === o.iso)
				defaultByIso = o.id;

			a[o.id] = {
				value: o.id,
				label: <><Flag iso={o.iso} small /> <span className={css.label}>{o.name}</span></>,
				s: o.name,
			} as SelectOption;
			return a;
		}, {});

		return {
			opts: Object.values(c).sort((a:any, b:any) => compare(a.s, b.s)) as SelectOption[],
			defaultVal: defaultValue
				? Array.isArray(defaultValue)
					? defaultValue.map(v => c[v.value as string])
					: c[defaultValue.value as string]
				: defaultByIso ? c[defaultByIso] : null,
		};
	}, [data, defaultValue, defaultValueIso]);

	if (fetching)
		return <Select name={name} disabled placeholder="Loading..." />;

	const onFilter = (opt, val) => fuzzy(val, opt.data.s);

	return (
		<Select
			{...props}
			name={name}
			defaultValue={defaultVal}
			options={opts}
			filterOption={onFilter}
		/>
	);
}
