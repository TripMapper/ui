import css from './style.module.scss';
import MenuItem, { MenuItem as MenuItemType } from './MenuItem';

export interface MenuItems {
	items: ReadonlyArray<MenuItemType>;
}

export default function Menu ({ items } : MenuItems) {
	return (
		<ul className={css.menu}>
			{items.map(item => (
				<MenuItem key={item.uri} {...item} />
			))}
		</ul>
	);
}
