/// <reference types="react" />
import { Icons } from '../../Types';
export interface MenuItem {
    name: string;
    uri: string;
    /** @default false */
    exact?: boolean;
    icon?: Icons;
}
export default function MenuItem({ name, uri, exact, icon }: MenuItem): JSX.Element;
