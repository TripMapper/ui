import css from './style.module.scss';
import MenuItem from './MenuItem';
export default function Menu({ items }) {
    return (<ul className={css.menu}>
			{items.map(item => (<MenuItem key={item.uri} {...item}/>))}
		</ul>);
}
