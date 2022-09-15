/// <reference types="react" />
import { CheckboxProps } from '../Checkbox';
export interface CheckboxesProps {
    name: string;
    options: Omit<CheckboxProps, 'name'>[];
}
export default function Checkboxes({ name, options, }: CheckboxesProps): JSX.Element;
