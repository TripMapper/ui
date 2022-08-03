import css from './style.module.scss';
import { gql } from 'urql';
import { useMemo, Fragment } from 'react';
import titleCase from '../util/titleCase';
export const METADATA_FRAGMENT = gql `
	fragment Metadata on Meta {
		id
		primaryType
		secondaryType
		value
	}
`;
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
							<i>{item.primaryType}</i>
							<span>{item.value}</span>
							<small>{titleCase(item.secondaryType.split('_', 2)[1])}</small>
						</dd>))}
				</Fragment>))}
		</dl>);
}
