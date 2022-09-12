import { ChangeEventHandler, FocusEventHandler } from 'react';
export interface TextAreaProps {
    className?: string;
    name?: string | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    value?: string | number | undefined;
    defaultValue?: string | number | undefined;
    /** @default 4 */
    rows?: number | undefined;
    onFocus?: FocusEventHandler<HTMLTextAreaElement> | undefined;
    onBlur?: FocusEventHandler<HTMLTextAreaElement> | undefined;
    onInput?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
    onChange?: ChangeEventHandler<HTMLTextAreaElement> | undefined;
}
declare const TextArea: import("react").ForwardRefExoticComponent<TextAreaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
export default TextArea;
