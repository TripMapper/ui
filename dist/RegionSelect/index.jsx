import Select from '../Select';
import { gql, useQuery } from 'urql';
import { useMemo } from 'react';
import Flag from '../Flag';
const REGION_SELECT_QUERY = gql `
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
export default function RegionSelect({ countryIds = [], defaultValue, name, ...props }) {
    const [{ data, fetching }] = useQuery({
        query: REGION_SELECT_QUERY,
        variables: { countryIds },
        pause: !countryIds.length,
    });
    const { opts, defaultVal } = useMemo(() => {
        if (!data || !data.regions || countryIds.length === 0)
            return { opts: [], defaults: null };
        const byCountryId = {}, regionById = {};
        data.regions.nodes.forEach(region => {
            if (!byCountryId.hasOwnProperty(region.country.id))
                byCountryId[region.country.id] = {
                    label: <><Flag iso={region.country.iso} small/> {region.country.name}</>,
                    options: [],
                };
            byCountryId[region.country.id].options.push({
                label: region.name,
                value: region.id,
            });
            regionById[region.id] = {
                label: region.name,
                value: region.id,
            };
        });
        const opts = Object.values(byCountryId);
        const { compare } = new Intl.Collator();
        opts.forEach((group) => {
            group.options = group.options.sort((a, b) => compare(a.label, b.label));
        });
        return {
            opts,
            defaultVal: defaultValue
                ? Array.isArray(defaultValue)
                    ? defaultValue.map(v => regionById[v.value])
                    : regionById[defaultValue.value]
                : null,
        };
    }, [data, countryIds]);
    if (fetching)
        return <Select name={name} disabled placeholder="Loading..."/>;
    if (opts.length === 0)
        return <Select name={name} disabled placeholder="No regions available"/>;
    return (<Select {...props} name={name} defaultValue={defaultVal} options={opts}/>);
}
