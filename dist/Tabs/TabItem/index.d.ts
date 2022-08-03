/// <reference types="react" />
export interface TabItemProps {
    name: string;
    uri?: string;
    onClick?: () => void;
    /** @default false */
    exact?: boolean;
    /** @default false */
    isActive?: boolean;
}
interface TabItemPropsWithLayoutId extends TabItemProps {
    tabLayoutId: string;
}
export default function TabItem({ uri, name, exact, onClick, isActive, tabLayoutId }: TabItemPropsWithLayoutId): JSX.Element;
export {};
