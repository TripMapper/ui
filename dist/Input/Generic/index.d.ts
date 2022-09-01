/// <reference types="react" />
import { BaseInputProps } from '../Base';
export interface GenericInputProps extends BaseInputProps {
    prefix?: any;
    suffix?: any;
    merged?: boolean;
}
export default function Generic({ prefix, suffix, onFocus, onBlur, merged, ...props }: GenericInputProps): JSX.Element;
