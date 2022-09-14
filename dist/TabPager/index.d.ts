/// <reference types="react" />
export interface TabPagerPageProps {
    handle: string;
    children: any;
}
export interface TabPagerProps {
    active: string;
    children: any;
    className?: string;
    pageClassName?: string | ((handle: string) => string);
    withPadding?: boolean;
}
declare const Page: ({ handle, children }: TabPagerPageProps) => any;
export { Page };
export default function TabPager({ active, children, className, pageClassName, withPadding, }: TabPagerProps): JSX.Element;
