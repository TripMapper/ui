import css from './style.module.scss';
export default function ListWithAction({ items }) {
    return (<ul className={css.list}>
			{items.map(item => (<li key={item.key}>
					{item.value}
					{item.action}
				</li>))}
		</ul>);
}
