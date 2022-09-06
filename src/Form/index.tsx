import css from './style.module.scss';
import { FormEvent } from 'react';
import formToObj, { FormValue } from '../util/formToObj';
import { cx } from '../util';

export type FormSubmit = (
	values: { [key: string]: FormValue },
	event: FormEvent,
) => void;

export interface FormProps extends Omit<HTMLFormElement, 'onSubmit'> {
	onSubmit?: FormSubmit;
	className?: string;
}

export default function Form ({ onSubmit, children, className, ...props } : FormProps) {
	const _onSubmit = async e => {
		e.preventDefault();
		e.persist();
		onSubmit && onSubmit(formToObj(new FormData(e.target), e.target), e);
	};

	return (
		<form {...props} onSubmit={_onSubmit} className={cx(css.form, className)}>
			{children}
		</form>
	);
}
