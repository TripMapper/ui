/// <reference types="react" />
import { Icons } from '../../Types';
export interface TabItemProps {
    name: string;
    uri?: string;
    onClick?: () => void;
    /** @default false */
    exact?: boolean;
    /** @default false */
    isActive?: boolean;
    icon?: Icons;
}
interface TabItemPropsWithInternal extends TabItemProps {
    tabLayoutId: string;
    compact: boolean;
}
export default function TabItem({ uri, name, exact, onClick, isActive, tabLayoutId, icon, compact, }: TabItemPropsWithInternal): JSX.Element;
export {};
