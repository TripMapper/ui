/// <reference types="react" />
import { GenericButtonProps } from './Generic';
export interface ButtonProps extends GenericButtonProps {
    /** @default false */
    secondary?: boolean;
    /** @default false */
    tertiary?: boolean;
    /** @default false */
    text?: boolean;
    /** @default false */
    dashed?: boolean;
    /** @default false */
    flat?: boolean;
    className?: string;
}
declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export default Button;
