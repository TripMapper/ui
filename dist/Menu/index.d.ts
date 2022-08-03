/// <reference types="react" />
import { MenuItem as MenuItemType } from './MenuItem';
export interface MenuItems {
    items: ReadonlyArray<MenuItemType>;
}
export default function Menu({ items }: MenuItems): JSX.Element;
