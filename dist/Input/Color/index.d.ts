/// <reference types="react" />
import { GenericInputProps } from '../Generic';
export interface ColorInputProps extends Omit<GenericInputProps, "prefix" | "type"> {
}
declare const Color: import("react").ForwardRefExoticComponent<ColorInputProps & import("react").RefAttributes<HTMLInputElement>>;
export default Color;
