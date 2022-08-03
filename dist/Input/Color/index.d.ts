/// <reference types="react" />
import { GenericInputProps } from '../Generic';
export interface ColorInputProps extends Omit<GenericInputProps, "prefix" | "type"> {
}
export default function Color({ onChange, defaultValue, name, ...props }: ColorInputProps): JSX.Element;
