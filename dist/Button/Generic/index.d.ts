/// <reference types="react" />
import { BaseButtonProps, BaseButtonPropsWithClassName } from '../Base';
export interface GenericButtonProps extends BaseButtonProps {
    /** @default false */
    wide?: boolean;
    /** @default medium */
    size?: 'tiny' | 'small' | 'medium' | 'large';
    /** @default false */
    busy?: boolean;
    /** @default false */
    noPadding?: boolean;
}
export interface GenericButtonPropsWithClassName extends GenericButtonProps, BaseButtonPropsWithClassName {
    userClass?: string;
}
declare const Generic: import("react").ForwardRefExoticComponent<GenericButtonPropsWithClassName & import("react").RefAttributes<HTMLButtonElement>>;
export default Generic;
