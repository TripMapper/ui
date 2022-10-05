import { ChangeEventHandler, FocusEventHandler, Ref } from 'react';
export interface BaseInputProps {
    /** @default text */
    type?: 'color' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url' | 'week' | 'date' | 'time' | 'datetime-local' | 'numeric';
    autoComplete?: string | undefined;
    autoFocus?: boolean | undefined;
    disabled?: boolean | undefined;
    max?: number | string | undefined;
    maxLength?: number | undefined;
    min?: number | string | undefined;
    minLength?: number | undefined;
    name?: string | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    size?: number | undefined;
    step?: number | string | undefined;
    value?: string | number | undefined;
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;
    defaultValue?: string | number | undefined;
    onFocus?: FocusEventHandler<HTMLInputElement> | undefined;
    onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
    onInput?: ChangeEventHandler<HTMLInputElement> | undefined;
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}
export interface BaseInputPropsWithClassName extends BaseInputProps {
    className?: string;
    ref?: Ref<HTMLInputElement>;
}
declare const Base: import("react").ForwardRefExoticComponent<Pick<BaseInputPropsWithClassName, "type" | "readOnly" | "size" | "disabled" | "pattern" | "autoComplete" | "autoFocus" | "max" | "maxLength" | "min" | "minLength" | "name" | "defaultValue" | "className" | "placeholder" | "inputMode" | "required" | "step" | "value" | "onFocus" | "onBlur" | "onChange" | "onInput"> & import("react").RefAttributes<HTMLInputElement>>;
export default Base;
