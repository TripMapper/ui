/// <reference types="react" />
import { BaseInputProps } from '../Base';
export interface GenericInputProps extends BaseInputProps {
    prefix?: any;
    suffix?: any;
}
export default function Generic({ prefix, suffix, onFocus, onBlur, ...props }: GenericInputProps): JSX.Element;
