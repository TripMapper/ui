import css from './style.module.scss';
import { FormEvent, useRef } from 'react';
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
	const self = useRef();

	const _onSubmit = async e => {
		e.preventDefault();
		e.persist();

		if (e.target !== self.current) {
			process.env.NODE_ENV === 'development' && console.warn('Tried submitting from another form!', self.current, e.target);
			return;
		}

		onSubmit && onSubmit(formToObj(new FormData(e.target), e.target), e);
	};

	return (
		<form {...props} onSubmit={_onSubmit} className={cx(css.form, className)} ref={self}>
			{children}
		</form>
	);
}
