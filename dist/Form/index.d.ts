import { FormEvent } from 'react';
export declare type FormSubmit = (values: {
    [key: string]: string | boolean | number;
}, event: FormEvent) => void;
export interface FormProps extends Omit<HTMLFormElement, 'onSubmit'> {
    onSubmit?: FormSubmit;
}
export default function Form({ onSubmit, children, ...props }: FormProps): JSX.Element;
