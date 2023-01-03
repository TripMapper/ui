import css from './style.module.scss';
import { gql } from 'urql';
import { useMemo, Fragment } from 'react';
import titleCase from '../util/titleCase';
import Icon from '../Icon';
export const METADATA_FRAGMENT = gql `
	fragment Metadata on Meta {
		id
		primaryType
		secondaryType
		value
	}
`;
function itemLink({ primaryType, value }) {
    switch (primaryType) {
        case 'EMAIL': return <a href={`mailto:${value}`}>{value}</a>;
        case 'PHONE': return <a href={`tel:${value}`}>{value}</a>;
        case 'LINK': return <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>;
        case 'ADDRESS': return <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(value)}`} target="_blank" rel="noopener noreferrer">{value}</a>;
        default: return value;
    }
}
export default function Metadata({ meta }) {
    const groupedMeta = useMemo(() => {
        const grouped = {};
        meta.forEach(item => {
            if (!grouped.hasOwnProperty(item.primaryType))
                grouped[item.primaryType] = [];
            grouped[item.primaryType].push(item);
        });
        return Object.entries(grouped);
    }, [meta]);
    return (<dl className={css.metadata}>
			{groupedMeta.map(([group, items]) => (<Fragment key={group}>
					<dt>{group}</dt>
					{items.map(item => (<dd key={item.id}>
							<Icon of={`meta-${item.primaryType.toLowerCase()}`}/>
							<span>{itemLink(item)}</span>
							<small>{item.secondaryType && titleCase(item.secondaryType.split('_', 2)[1])}</small>
						</dd>))}
				</Fragment>))}
		</dl>);
}
