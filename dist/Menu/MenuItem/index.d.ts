/// <reference types="react" />
export interface MenuItem {
    name: string;
    uri: string;
    /** @default false */
    exact?: boolean;
}
export default function MenuItem({ name, uri, exact }: MenuItem): JSX.Element;
