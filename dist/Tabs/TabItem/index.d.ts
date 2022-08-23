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
interface TabItemPropsWithLayoutId extends TabItemProps {
    tabLayoutId: string;
}
export default function TabItem({ uri, name, exact, onClick, isActive, tabLayoutId, icon }: TabItemPropsWithLayoutId): JSX.Element;
export {};
