import { FormEvent } from 'react';
import { FormValue } from '../util/formToObj';
export declare type FormSubmit = (values: {
    [key: string]: FormValue;
}, event: FormEvent) => void;
export interface FormProps extends Omit<HTMLFormElement, 'onSubmit'> {
    onSubmit?: FormSubmit;
}
export default function Form({ onSubmit, children, ...props }: FormProps): JSX.Element;
