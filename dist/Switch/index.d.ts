import { ChangeEventHandler } from 'react';
export interface SwitchProps {
    className?: string;
    name?: string;
    label?: string;
    /** @default false */
    defaultChecked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}
declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLLabelElement>>;
export default Switch;
