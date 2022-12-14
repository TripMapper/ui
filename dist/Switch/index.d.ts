import { ChangeEventHandler } from 'react';
export interface SwitchProps {
    className?: string;
    name?: string;
    label?: string;
    preLabel?: string;
    /** @default false */
    defaultChecked?: boolean;
    /** @default (bool)1 */
    value?: string | number;
    /** @default (bool)0 */
    valueDefault?: string | number;
    center?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}
declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLLabelElement>>;
export default Switch;
