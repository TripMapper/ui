/// <reference types="react" />
import { BaseInputProps } from '../Base';
export interface GenericInputProps extends BaseInputProps {
    prefix?: any;
    suffix?: any;
    merged?: boolean;
}
declare const Generic: import("react").ForwardRefExoticComponent<GenericInputProps & import("react").RefAttributes<HTMLInputElement>>;
export default Generic;
