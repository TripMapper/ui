import css from './style.module.scss';
import { ReactNode } from 'react';

type ListWithActionItem = {
	key: string;
	value: ReactNode;
	action: ReactNode;
};

interface ListWithActionProps {
	items: readonly ListWithActionItem[];
}

export default function ListWithAction ({ items } : ListWithActionProps) {
	return (
		<ul className={css.list}>
			{items.map(item => (
				<li key={item.key}>
					{item.value}
					{item.action}
				</li>
			))}
		</ul>
	);
}
