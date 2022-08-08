import { MouseEventHandler, ReactNode } from 'react';
export interface BaseButtonProps {
    children?: ReactNode | undefined;
    prefix?: any;
    suffix?: any;
    /** @default false */
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    href?: string;
    target?: '_blank' | undefined;
    type?: 'button' | 'submit' | 'reset';
    El?: ReactNode;
}
export interface BaseButtonPropsWithClassName extends BaseButtonProps {
    className?: string;
}
declare const Base: import("react").ForwardRefExoticComponent<BaseButtonPropsWithClassName & import("react").RefAttributes<HTMLAnchorElement | HTMLButtonElement>>;
export default Base;
