import { FormEvent } from 'react';
import formToObj, { FormValue } from '../util/formToObj';

export type FormSubmit = (
	values: { [key: string]: FormValue },
	event: FormEvent,
) => void;

export interface FormProps extends Omit<HTMLFormElement, 'onSubmit'> {
	onSubmit?: FormSubmit;
}

export default function Form ({ onSubmit, children, ...props } : FormProps) {
	const _onSubmit = async e => {
		e.preventDefault();
		e.persist();
		onSubmit && onSubmit(formToObj(new FormData(e.target)), e);
	};

	return (
		<form {...props} onSubmit={_onSubmit}>
			{children}
		</form>
	);
}
