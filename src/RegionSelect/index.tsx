import Select from '../Select';
import { gql, useQuery } from 'urql';
import { SelectOption, SelectProps } from '../Select/Select';
import { useMemo } from 'react';
import Flag from '../Flag';

const REGION_SELECT_QUERY = gql`
	query GetRegionSelect ($countryIds: [UUID!]) {
        regions (filter: {
            countryId: { in: $countryIds }
            isArchived: { equalTo: false }
        }) {
            nodes {
                id
                name
                country {
                    id
                    name
                    iso
                }
            }
        }
	}
`;

export interface RegionSelectProps extends Omit<
	SelectProps,
	'query'|'queryWhenEmpty'|'preloadOptions'|'queryVariables'|'pathToNodes'
	|'options'|'filterOption' | 'isCreatable'
> {
	countryIds?: readonly string[];
}

export default function RegionSelect ({ countryIds = [], defaultValue, name, ...props } : RegionSelectProps) {
	const [{ data, fetching }] = useQuery({
		query: REGION_SELECT_QUERY,
		variables: { countryIds },
		pause: !countryIds.length,
	});

	const { opts, defaultVal } = useMemo(() => {
		if (!data || !data.regions || countryIds.length === 0) return { opts: [], defaults: null };

		const byCountryId = {}
			, regionById = {};

		data.regions.nodes.forEach(region => {
			if (!byCountryId.hasOwnProperty(region.country.id))
				byCountryId[region.country.id] = {
					label: <><Flag iso={region.country.iso} small /> {region.country.name}</>,
					options: [],
				};

			byCountryId[region.country.id].options.push({
				label: region.name,
				value: region.id,
			} as SelectOption);

			regionById[region.id] = {
				label: region.name,
				value: region.id,
			} as SelectOption;
		});

		const opts = Object.values(byCountryId) as SelectOption[];
		const { compare } = new Intl.Collator();

		opts.forEach((group: any) => {
			group.options = group.options.sort((a, b) => compare(a.label, b.label));
		});

		return {
			opts,
			defaultVal: defaultValue
				? Array.isArray(defaultValue)
					? defaultValue.map(v => regionById[v.value as string])
					: regionById[defaultValue.value as string]
				: null,
		};
	}, [data, countryIds]);

	if (fetching)
		return <Select name={name} disabled placeholder="Loading..." />;

	if (opts.length === 0)
		return <Select key="empty" name={name} disabled placeholder="No regions available" />;

	return (
		<Select
			{...props}
			name={name}
			defaultValue={defaultVal}
			options={opts}
		/>
	);
}
