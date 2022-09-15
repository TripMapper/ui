/// <reference types="react" />
import { CheckboxProps } from '../Checkbox';
export interface CheckboxesProps {
    name: string;
    options: Omit<CheckboxProps, 'name' | 'required'>[];
    /**
     * If true at least 1 is required, if a number at least X is required
     * @default false
     */
    required?: boolean | number;
}
export default function Checkboxes({ name, options, required, }: CheckboxesProps): JSX.Element;
